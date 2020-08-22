const lib = {
  bookmarks: [],
  submitting: false,
  filterLevel: 1,
  error: {}
};

const findById = function (id) {
  return this.lib.bookmarks.find(current => current.id === id);
};

const addBookmark = function (bookmark) {
  this.lib.bookmarks.push(bookmark);
  console.log('addBookmark ran and the bookmarks array is currently: ' + lib.bookmarks);
};

const findAndDeleteBookmark = function (id) {
  this.lib.bookmarks = this.lib.bookmarks.filter(bookmark => bookmark.id !== id);
};

const findAndUpdateBookmark = function (id, newData) {
  const foundBookmark = this.findById(id);
  Object.assign(foundBookmark, newData);
};

export default {
  lib,
  findById,
  addBookmark,
  findAndDeleteBookmark,
  findAndUpdateBookmark
};