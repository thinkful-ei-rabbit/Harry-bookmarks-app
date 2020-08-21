import $ from 'jquery';

import store from './store';
import api from './api';

const generateBookmarkHtmlSnippet = function (bookmark) {
  //function to generate the an individual bookmark html
//create a variable to store the return
//should check if the expanded view value is true and generate the larger description
//otherwise generate the smaller view
//dont forget to sets data-item-id for the li equal to the id
//returns html string
  
  console.log('generateBookmarkHtmlSnippet ran');

  let htmlSnippet = `
  <li class="bookmark" data-item-id="${bookmark.id}">
  <div class="box">
  <span>${bookmark.title}</span><br>
  <span>${bookmark.url}</span><br>
  <span>${bookmark.desc}</span><br>
  <span>${bookmark.rating}</span><br>
  <section class="box">
  <button class="bookmark-expand">
    <span class="button-label">expand</span>
  </button>
  <button class="bookmark-delete">
    <span class="button-label">delete</span>
  </button>
  </section>
  </div>
  </li>`;
  
  //console.log(htmlSnippet);

  return htmlSnippet;

};



const createBookmarksString = function (bookmarksArr) {

//function to put the bookmarks together into the full list
//take an array and map each item to a new array of the html snippets
//join them
//returns the full html of the list

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

//handle delete
//listen for delete button and grab the bkmrk id
//call api delete function, then delete from the store
//re render
//catch any errors/console log them, and render error function

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
    const bookmarkObj = { title, url, desc, rating };
    console.log(bookmarkObj);
    const bookmarkJson = JSON.stringify(bookmarkObj);
    api.createBookmark(bookmarkJson)
      .then(newBookmark => {
        store.addBookmark(newBookmark);
        render();
      }).catch(error => {
        //error functionality here
        render();
      })
  })
};
//handle new bookmark submit
//listen for 
//triggers a boolean in the store
//re renders

const getId = function (target) {
  
  return $(target)
    .closest('.bookmark')
    .data('item-id');
};
//insert the html into the dom

// function handleClicks () {
//   $('main').closest('div').on('click', () => console.log(event.currentTarget));
// };

//bind eventlisteners function that runs all the handlers in this file
const bindEventListeners = function() {
  handleSubmit();
  handleDeleteButton();
};

//export the render and bindeventlisteners functino

export default {
  render,
  bindEventListeners
};