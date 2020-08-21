const BASE_URL='https://thinkful-list-api.herokuapp.com/harryw';

const listApiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if(error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const getBookmarks = function() {
  return listApiFetch(`${BASE_URL}/bookmarks`);
};

//createBookmark
//updateBookmark
//deleteBookmark

export default {
  getBookmarks,
};