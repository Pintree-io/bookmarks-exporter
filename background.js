chrome.action.onClicked.addListener(() => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      const bookmarkHTML = convertTreeToHTML(bookmarkTreeNodes);
      const bookmarkJSON = bookmarksToJSON(bookmarkHTML, { stringify: true, formatJSON: true });
      const blob = new Blob([bookmarkJSON], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url: url,
        filename: 'bookmarks.json'
      });
    });
  });
  
  function convertTreeToHTML(bookmarkNodes) {
    let html = '';
    function traverse(nodes) {
      nodes.forEach(node => {
        if (node.url) {
          html += `<DT><A HREF="${node.url}" ADD_DATE="${node.dateAdded}">${node.title}</A>\n`;
        } else {
          html += `<DT><H3 ADD_DATE="${node.dateAdded}" LAST_MODIFIED="${node.dateGroupModified}">${node.title}</H3>\n<DL><p>\n`;
          if (node.children) {
            traverse(node.children);
          }
          html += `</DL><p>\n`;
        }
      });
    }
    traverse(bookmarkNodes);
    return html;
  }