String.prototype.remove = function (toRemove) {
  if (Array.isArray(toRemove)) {
    return toRemove.reduce((acc, value) => acc.replace(value, ''), this);
  }
  if (typeof toRemove === 'string') {
    return this.replace(toRemove, '');
  }
  return this;
};

const cleanupObject = (obj) => {
  Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));
  return obj;
};

const isFolder = (item) => !!item.querySelector('H3');
const isLink = (item) => !!item.querySelector('A');
const getTitle = (item) => {
  const el = item.querySelector('H3, A');
  return el ? el.textContent : '';
};
const getIcon = (item) => {
  const el = item.querySelector('A');
  return el ? el.getAttribute('ICON') : '';
};
const getUrl = (item) => {
  const el = item.querySelector('A');
  return el ? el.getAttribute('HREF') : '';
};
const getNumericProperty = (item, property) => {
  const el = item.querySelector(`[${property}]`);
  return el ? parseInt(el.getAttribute(property)) : undefined;
};

const transformLink = (markup) => {
  const link = cleanupObject({
    type: 'link',
    addDate: getNumericProperty(markup, 'ADD_DATE'),
    title: getTitle(markup),
    icon: getIcon(markup),
    url: getUrl(markup),
  });
  return link;
};

const transformFolder = (markup) => {
  const folder = cleanupObject({
    type: 'folder',
    addDate: getNumericProperty(markup, 'ADD_DATE'),
    lastModified: getNumericProperty(markup, 'LAST_MODIFIED'),
    title: getTitle(markup),
  });
  return folder;
};

const findChildren = (markup) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(markup, 'text/html');
  const items = doc.querySelectorAll('DT');
  const children = Array.from(items).map((item) => {
    if (isFolder(item)) return processFolder(item);
    if (isLink(item)) return transformLink(item);
  }).filter(Boolean);
  return children;
};

const processFolder = (folder) => {
  const dl = folder.querySelector('DL');
  const children = dl ? findChildren(dl.innerHTML) : [];
  const processedFolder = cleanupObject({
    ...transformFolder(folder),
    children,
  });
  return processedFolder;
};

/**
 * Convert NETSCAPE-Bookmark-file to JSON format
 * @param {string} markup - The content of the bookmarks file
 * @param {object} options - { stringify, formatJSON, spaces }
 * @returns The bookmarks in JSON format
 * @see https://github.com/zorapeteri/bookmarks-to-json
 */
function bookmarksToJSON(markup, { stringify = true, formatJSON = false, spaces = 2 } = {}) {
  const obj = findChildren(markup);
  if (!stringify) return obj;
  return JSON.stringify(obj, ...(formatJSON ? [null, spaces] : []));
}