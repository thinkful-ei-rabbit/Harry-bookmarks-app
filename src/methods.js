import $ from 'jquery';

import store from './store';
//import api from './api';

const generateBookmarkHtmlSnippet = function (bookmark) {
  console.log('generateBookmarkHtmlSnippet ran');

  let htmlSnippet = `<div class="box bookmark">${bookmark.url}</div>`;
  
  console.log(htmlSnippet);

  return htmlSnippet;

};

//function to generate the an individual bookmark html
//create a variable to store the return
//should check if the expanded view value is true and generate the larger description
//otherwise generate the smaller view
//dont forget to sets data-item-id for the li equal to the id
//returns html string

const createBookmarksString = function (bookmarksArr) {
  console.log('createBookmarkString ran taking the argument ' + bookmarksArr);
  const bookmarksString = bookmarksArr.map((bookmark) => {
    return generateBookmarkHtmlSnippet(bookmark);
  });
  return bookmarksString.join('');
};

//function to put the bookmarks together into the full list
//take an array and map each item to a new array of the html snippets
//join them
//returns the full html of the list

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

//handle delete
//listen for delete button and grab the bkmrk id
//call api delete function, then delete from the store
//re render
//catch any errors/console log them, and render error function

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
  console.log('bookmarks string created as ' + bookmarksString);
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

//handle new bookmark submit
//listen for 
//triggers a boolean in the store
//re renders

//

//insert the html into the dom

//bind eventlisteners function that runs all the handlers in this file
const bindEventListeners = function() {

};

//export the render and bindeventlisteners functino

export default {
  render,
  bindEventListeners
};