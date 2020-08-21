import $ from 'jquery';
//import cuid from 'cuid';

import './index.css';
//import 'normalize.css';

import api from './api';
import store from './store';
import methods from './methods';

function main () {
    //will run api function to generate the list initially
    //run from methods to activate the event listeners
    //run from methods the render function
    api.getBookmarks()
        .then((bookmarks) => {
            bookmarks.forEach((bookmark => store.addBookmark(bookmark)));
            methods.render();
        });

    methods.bindEventListeners();
    methods.render();
}

$(main);