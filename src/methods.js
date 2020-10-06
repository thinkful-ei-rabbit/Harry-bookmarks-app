import $ from 'jquery';
import store from './store';
import api from './api';

const generateBookmarkHtmlSnippet = function (bookmark) {

  console.log('generateBookmarkHtmlSnippet ran');

  let htmlSnippet = `
        <li class="bookmark" data-item-id="${bookmark.id}">
              <div class="box">
                  <span>${bookmark.rating}</span>
                  <h3>${bookmark.title}</h3>
                  <div class="truncated">
                    <button class="bookmark-expand">---expand/collapse---</button>
                     <div class="extra-info hidden">
                        <span>${bookmark.url}</span><br>
                        <span>${bookmark.desc}</span><br>
                     <div>
                      <a href="${bookmark.url}"><button class="visit-link">visit</button></a>
                      <button class="bookmark-delete">delete</button>
                    </div>
                  </div>
                  </div>
                </div>
            </li>`; 
  return htmlSnippet;
};

const createBookmarksString = function (bookmarksArr) {
  console.log('createBookmarkString ran taking the argument', bookmarksArr);
  const bookmarksString = bookmarksArr.map((bookmark) => {
    return generateBookmarkHtmlSnippet(bookmark);
  });
  return bookmarksString.join('');
};

const handleDeleteButton = function () {
  $('.list-container').on('click', '.bookmark-delete', event => {
    const id = getId(event.currentTarget);
    console.log('found id: ' + id);
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
  $('.list-container').on('click','.bookmark-expand', event => {
    $(event.currentTarget).siblings('.extra-info').toggleClass('hidden');
  });
};

const handleFilterChoice = function () {
  $('select').change(function (event) {
    const filterValue = $(event.currentTarget).val();
    console.log(filterValue);
    const filteredBookmarks = [...store.lib.bookmarks.filter(bookmark => bookmark.rating >= filterValue)];
    const filteredBookmarksString = createBookmarksString(filteredBookmarks);
    $('#target').html(filteredBookmarksString);
  });
};


const render = function () {
  console.log('render ran');
  const bookmarks = [...store.lib.bookmarks];
  console.log('bookmarks imported as ' + bookmarks);
  const bookmarksString = createBookmarksString(bookmarks);

  if(store.lib.error.message.length > 0) {
    let errorString = `<h3>${store.lib.error.message}</h3>`;
    store.lib.error = { message: '' };
    $('.error-container').html(errorString);
    // errorString = '';
  } else {
    $('.error-container').html('');
  }

  $('#target').html(bookmarksString);
  console.log('html inserted at #target');
};

const handleSubmit = function () {
  $('.container').on('submit', '.bookmark-entry', event => {
    event.preventDefault();
    console.log(event.currentTarget);
    const id = getId(event.currentTarget);
    const title = $(event.currentTarget).find('#title-entry').val();
    $('#title-entry').val('');
    const url = $(event.currentTarget).find('#url-entry').val();
    $('#url-entry').val('');
    const desc = $(event.currentTarget).find('#desc-entry').val();
    $('#desc-entry').val('');
    const rating = $(event.currentTarget).find('#rating-entry').val();
    $('#rating-entry').val('');
    console.log(id,title,url,desc,rating);

    const bookmarkObj = { title, url, desc, rating, expanded:false};
    console.log(bookmarkObj);

    const bookmarkJson = JSON.stringify(bookmarkObj);
    api.createBookmark(bookmarkJson)
      .then(newBookmark => {
        store.addBookmark(newBookmark);
        toggleNewLinkSubmit();
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
  $('main').on('click', '#add-new-link', event => {
    console.log('handleNewLinkButton ran');
    toggleNewLinkSubmit();
    store.lib.submitting = true;
  });
};

const handleCancelSubmit = function () {
  $('#cancel-submit').on('click', event => toggleNewLinkSubmit());
  store.lib.error = { message: '' };
  render();
};

const toggleNewLinkSubmit = function() {
  store.lib.error = { message: '' };
  $('form.bookmark-entry').toggleClass('hidden');
  $('#add-new-link').toggleClass('hidden');
  render();
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