import $ from 'jquery';
import builders from './builders';
import store from './store';
import api from './api';


const createBookmarksString = function (bookmarksArr) {
  
  const bookmarksString = bookmarksArr.filter(bookmark => bookmark.rating >= store.lib.filterLevel).map((bookmark) => {
    return builders.createBookmarkHtml(bookmark);
  });
  
  return builders.createListContainerHtml(bookmarksString.join(''));
};

const handleDeleteButton = function () {
  $('#target').on('click', '.bookmark-delete', event => {
    const id = getId(event.currentTarget);

    api.deleteBookmark(id)
      .then(() => {
        store.findAndDeleteBookmark(id);
        render();
      }).catch(error => {
        console.log(error.message);
        render();
      });
  });
};

const handleBookmarkExpand = function () {
  $('#target').on('click','.bookmark-expand', event => {
    $(event.currentTarget).siblings('.extra-info').toggleClass('hidden');
  });
};


const handleFilterChoice = function () {
  $('#target').on('change', '#filter-selection', event => {
    store.lib.filterLevel = Number($(event.currentTarget).val());
    render();  
  });
};

const handleSubmit = function () {
  $('#target').on('submit', '.bookmark-entry', event => {
    event.preventDefault();
    console.log(event.currentTarget);
    const id = getId(event.currentTarget);
    const title = $(event.currentTarget).find('#title-entry').val();
    const url = $(event.currentTarget).find('#url-entry').val();
    const desc = $(event.currentTarget).find('#desc-entry').val();
    const rating = $(event.currentTarget).find('#rating-entry').val();
    console.log(id,title,url,desc,rating);

    const bookmarkObj = { title, url, desc, rating, expanded:false };
    console.log(bookmarkObj);

    const bookmarkJson = JSON.stringify(bookmarkObj);
    api.createBookmark(bookmarkJson)
      .then(newBookmark => {
        store.addBookmark(newBookmark);
        store.lib.submitting = false;
        render();
      }).catch(error => {
        console.log(error.message);
        store.lib.error = error;
        render();
      });
  });
};

const getId = function (target) {
  
  return $(target)
    .closest('.bookmark')
    .data('item-id');
};

const handleNewLinkButton = function () {
  $('#target').on('click', '#add-new-link', event => {
    console.log('handleNewLinkButton ran');
    store.lib.submitting = true;
    render();
  });
};

const handleCancelSubmit = function () {
  $('#target').on('click', '#cancel-submit' , event => {
    store.lib.submitting = false
    render();
  });
};

const render = function () {
  const bookmarks = [ ...store.lib.bookmarks ];
  let htmlToInject = '';
  if (store.lib.error.message !== '') {
    htmlToInject += builders.createErrorHtml(store.lib.error.message)
    store.lib.error.message = '';
  }
  htmlToInject += builders.createFilterHtml();
  if(store.lib.submitting === true) {
    htmlToInject += builders.createSubmitHtml();
  }
  htmlToInject += createBookmarksString(bookmarks);
  $('#target').html(htmlToInject);
};

const bindEventListeners = function() {
  handleSubmit();
  handleDeleteButton();
  handleNewLinkButton();
  handleCancelSubmit();
  handleBookmarkExpand();
  handleFilterChoice();
};

export default {
  render,
  bindEventListeners
};