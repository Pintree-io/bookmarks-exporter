export const getCopyYear = () => {
  const currentYear = new Date().getFullYear()
  const year = currentYear === 2024 ? "2024" : `2024 - ${currentYear}`
  return year
}

/**
 * Recursive change of object array
 * @param {Array} target Source array - Required
 * @param {Function} transform Callback function, change the data structure - Required
 * @param {String} childName The key name of the child array, the default is children - Not required
 * @returns data - The new array after the change
 * @example
 * // Basic Use
 * recursiveChange([...], (item:T, index:number) => ({ ...item, test:'test' }))
 */
export const recursiveChange = <T>(
  target: T[],
  transform: (item: T, index: number) => T,
  childName: string = 'children',
): T[] => {
  return target.map((item, index) => {
    // Create new objects to avoid modifying the original objects
    const newItem = { ...item, ...transform(item, index) };

    // Check if a subarray exists and recurse
    if (newItem[childName] && Array.isArray(newItem[childName])) {
      newItem[childName] = recursiveChange(newItem[childName], transform, childName);
    }

    return newItem;
  });
};

interface TreeNode {
  id: string;
  [key: string]: any;
}

/**
 * Recursively search for an object in an array of objects
 * @param {Array} sourceArray Source array - Required
 * @param {Function} predicate Callback function, find the target object - Required
 * @param {String} childKey The key name of the child array, the default is 'children' - Not required
 * @returns data - The target object
 * @example
 * // Basic Use
 * recursiveFind([...], (item:T, index:number) => item.id === 1)
 */
export const recursiveFind = <T extends TreeNode>(
  sourceArray: T[],
  predicate: (item: T, index: number) => boolean,
  childKey: string = 'children',
): T[] => {
  const result: T[] = [];

  sourceArray.forEach((item, index) => {
    if (predicate(item, index)) {
      const newItem = { ...item };
      if (item[childKey] && Array.isArray(item[childKey])) {
        (newItem[childKey] as T[]) = recursiveFind(item[childKey] as T[], predicate, childKey);
      }
      result.push(newItem);
    } else if (item[childKey] && Array.isArray(item[childKey])) {
      const children = recursiveFind(item[childKey] as T[], predicate, childKey);
      if (children.length > 0) {
        const newItem = { ...item, [childKey]: children };
        result.push(newItem);
      }
    }
  });

  return result;
};
