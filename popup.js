document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startBtn').addEventListener('click', startExtension);
});

function startExtension() {
  document.getElementById('startContainer').style.display = 'none';
  document.getElementById('mainContainer').style.display = 'block';

  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    console.log('Bookmark Tree Nodes:', bookmarkTreeNodes); // Debugging line
    const treeContainer = document.getElementById('bookmarkTree');
    renderBookmarkTree(bookmarkTreeNodes, treeContainer, 0); // Start at level 0
  });

  document.getElementById('exportBtn').addEventListener('click', exportSelectedBookmarks);
}

function renderBookmarkTree(nodes, container, level) {
  const ul = document.createElement('ul');
  nodes.forEach(node => {
    const li = document.createElement('li');
    const expandButton = document.createElement('button');
    expandButton.textContent = '+';
    expandButton.className = 'folder';
    expandButton.style.marginRight = '5px';
    expandButton.addEventListener('click', function() {
      toggleExpandCollapse(this);
    });

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.id = node.id;

    checkbox.addEventListener('change', function() {
      toggleSelectAll(this, this.checked);
    });

    const span = document.createElement('span');
    if (node.url) {
      const icon = document.createElement('img');
      icon.src = 'chrome://favicon/' + node.url;
      icon.className = 'icon';
      span.appendChild(icon);
      span.appendChild(document.createTextNode(node.title));
    } else {
      span.appendChild(document.createTextNode(node.title));
    }

    li.appendChild(expandButton);
    li.appendChild(checkbox);
    li.appendChild(span);
    ul.appendChild(li);

    if (node.children) {
      const childUl = document.createElement('ul');
      if (level >= 1) {
        childUl.classList.add('hidden');
        expandButton.textContent = '+';
      } else {
        expandButton.textContent = '-';
      }
      renderBookmarkTree(node.children, childUl, level + 1);
      li.appendChild(childUl);
    }
  });
  container.appendChild(ul);
}

function toggleExpandCollapse(button) {
  const childUl = button.parentElement.querySelector('ul');
  if (childUl.classList.contains('hidden')) {
    childUl.classList.remove('hidden');
    button.textContent = '-';
  } else {
    childUl.classList.add('hidden');
    button.textContent = '+';
  }
}

function toggleSelectAll(checkbox, isChecked) {
  const childCheckboxes = checkbox.parentElement.querySelectorAll('input[type="checkbox"]');
  childCheckboxes.forEach(childCheckbox => {
    childCheckbox.checked = isChecked;
    toggleSelectAll(childCheckbox, isChecked);
  });
}

function exportSelectedBookmarks() {
  const selectedNodes = new Set();
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
    selectedNodes.add(checkbox.dataset.id);
  });

  if (selectedNodes.size === 0) {
    console.log('No bookmarks selected');
    return;
  }

  console.log('Selected Nodes:', Array.from(selectedNodes)); // Debugging line

  const promises = Array.from(selectedNodes).map(id => {
    return new Promise((resolve) => {
      chrome.bookmarks.getSubTree(id, (bookmarkTreeNodes) => {
        resolve(bookmarkTreeNodes[0]);
      });
    });
  });

  Promise.all(promises).then((bookmarkTreeNodes) => {
    console.log('Selected Bookmark Tree Nodes:', bookmarkTreeNodes); // Debugging line

    const uniqueNodes = removeDuplicateNodes(bookmarkTreeNodes);
    const bookmarkHTML = convertTreeToHTML(uniqueNodes);
    console.log('Bookmark HTML:', bookmarkHTML); // Debugging line

    const bookmarkJSON = bookmarksToJSON(bookmarkHTML, { stringify: true, formatJSON: true });
    console.log('Bookmark JSON:', bookmarkJSON); // Debugging line

    const blob = new Blob([bookmarkJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: 'selected_bookmarks.json'
    });
  });
}

function removeDuplicateNodes(nodes, parentNodeMap = new Map()) {
  const nodeMap = new Map();
  nodes.forEach(node => {
    if (!parentNodeMap.has(node.id)) {
      nodeMap.set(node.id, node);
      parentNodeMap.set(node.id, true);
      if (node.children) {
        node.children = removeDuplicateNodes(node.children, parentNodeMap);
      }
    }
  });
  return Array.from(nodeMap.values());
}

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