export const getCopyYear = () => {
  const currentYear = new Date().getFullYear()
  const year = currentYear === 2024 ? "2024" : `2024 - ${currentYear}`
  return year
}


export const getChromeBookmarks = async () => {
  try {
    const bookmarks = await new Promise((resolve, reject) => {
      chrome.bookmarks.getTree((bookmarks) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(bookmarks);
        }
      });
    });
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
};
