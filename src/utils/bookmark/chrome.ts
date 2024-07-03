export const getChromeBookmarks = async () => {
  try {
    const bookmarks = await new Promise((resolve, reject) => {
      chrome.bookmarks.getTree((bookmarks) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve(bookmarks)
        }
      });
    });
    return bookmarks
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    throw error
  }
};
