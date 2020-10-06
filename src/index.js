import $ from 'jquery';
import './index.css';

import api from './scripts/api';
import store from './scripts/store';
import methods from './scripts/methods';

function main () {
 
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark => store.addBookmark(bookmark)));
      methods.render();
    });

  methods.bindEventListeners();
  methods.render();
}

$(main);