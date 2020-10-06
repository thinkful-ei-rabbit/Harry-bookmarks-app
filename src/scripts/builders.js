const createErrorHtml = function (error) {
  return `<div class="box">
          <div class="error-container">
            <h3>Error: ${error}</h3>
          </div>
          </div>`;
  }

const createFilterHtml = function () {
  return`<div class="box">
          <h3>Filter:</h3>
          <select name="filter" id="filter-selection">
            <option value="0"> ---- </option>
            <option value="1">Show everything</option>
            <option value="2">Nothing below 2</option>
            <option value="3">Nothing below 3</option>
            <option value="4">Nothing below 4</option>
            <option value="5">Only 5s</option>
          </select>
          <button type="submit" id="add-new-link">Add New Link</button>
        </div>`;
}

const createSubmitHtml = function () {
  return `<div class="box">
            <form class="bookmark-entry">
                <span>
                    <label for="title-entry">Title of Site</label>
                    <input type="text" name="title-entry" id="title-entry">
                </span>
                <span>
                    <label for="url-entry">Url Entry</label>
                    <input type="text" name="url-entry" id="url-entry" value="http://">
                </span>
                <span>
                    <label for="desc-entry">Description</label>
                    <input type="text" name="desc-entry" id="desc-entry">
                </span>
                <span>
                    <label for="rating-entry">Rating out of 5</label>
                    <input type="number" name="rating-entry" id="rating-entry" min="1" max="5">
                </span>
                <span><button type="submit" id="submit">Submit</button><button type="submit"
                        id="cancel-submit">Cancel</button></span>
            </form>
          </div>`;
}

const createListContainerHtml = function (bookmarksList) {
  return `<ul class="container list-container" id="target">
            ${bookmarksList}
          </ul>`;
}

const createBookmarkHtml = function (bookmark) {
  return `
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
}

export default {
  createErrorHtml,
  createFilterHtml,
  createSubmitHtml,
  createListContainerHtml,
  createBookmarkHtml,
};