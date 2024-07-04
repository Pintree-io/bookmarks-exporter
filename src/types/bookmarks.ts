export type TreeDataNode = chrome.bookmarks.BookmarkTreeNode


export interface ChangedTreeData extends TreeDataNode {
  type: "folder" | "link"
}
