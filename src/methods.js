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


//function to generate the error html
//takes error message string
//returns html in a section tag

//render function just for error
//checks to see if an error is in the store
//html method to insert in a class called error container or something
//empty the container if no error message

//handle close Error
//listen for clicking the close button on the error message
//store - set the error back to null
//rendererror function

const handleDeleteButton = function () {
  $('.list-container').on('click', '.bookmark-delete', event => {
    const id = getId(event.currentTarget);
    console.log('found id: ' + id);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDeleteBookmark(id);
        render();
      }).catch(error => {
        //add error functionality here
        render();
      });
  });
};

const handleBookmarkExpand = function () {
  $('.list-container').on('click','.bookmark-expand', event => {
    console.log('EXPANDED RAN');
    $(event.currentTarget).siblings('.extra-info').toggleClass('hidden');
  });
};

//handle expand button
//listen for expand button and grab the bookmark id
//save it as a variable and use it to find the bookmark (also save that as a variable)
//run an update api sending the id and a value obj {expanded: !bookmark.expanded}
//then do the same to the store
//catch and render errors

//handle filter setting function
//listen for the filter dropdown
//run a function in the store to set the filter value (1-5)
//run the render function

const render = function () {
  console.log('render ran');
  const bookmarks = [...store.lib.bookmarks];
  console.log('bookmarks imported as ' + bookmarks);
  const bookmarksString = createBookmarksString(bookmarks);
  //console.log('bookmarks string created as ' + bookmarksString);
  $('#target').html(bookmarksString);
  console.log('html inserted at #target');
};
//render function needs to check filter
//might need to start with rendererror
//get the array of bookmarks from store
//filter the items by the current filter setting
//create a variable to store the bookmarks and set it equal to the generatebookmarks string function(giving it items)



//function that get bookmark id from element closest data-item id article
//returns that value

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
        //error functionality here
        render();
      })
  })
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
};

const toggleNewLinkSubmit = function() {
  $('form.bookmark-entry').toggleClass('hidden');
  $('#add-new-link').toggleClass('hidden');
};


const bindEventListeners = function() {
  handleSubmit();
  handleDeleteButton();
  handleNewLinkButton();
  handleCancelSubmit();
  handleBookmarkExpand();
  handleBookmarkCollapse();
};

//export the render and bindeventlisteners functino

export default {
  render,
  bindEventListeners
};