import $ from 'jquery';
import './index.css';

import api from './api';
import store from './store';
import methods from './methods';

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