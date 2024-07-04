/**
 * Recursive change of object array with asynchronous transform function
 * @param {Array} target Source array - Required
 * @param {Function} transform Async callback function, change the data structure - Required
 * @param {String} childName The key name of the child array, the default is children - Not required
 * @returns data - The new array after the change
 * @example
 * // Basic Use
 * await recursiveChange([...], async (item:T, index:number) => ({ ...item, test:'test' }))
 */
export const recursiveChange = async <T, U>(
  target: T[],
  transform: (item: T, index: number) => Promise<U>,
  childName: string = 'children',
) => {
  return Promise.all(target.map(async (item, index) => {
    // Apply the transform function and await its result
    const transformedItem = await transform(item, index);

    // If the transformed item is not an object, return it directly
    if (typeof transformedItem !== 'object' || transformedItem === null) {
      return transformedItem;
    }

    // Create a new object only with the transformed item
    let newItem = { ...transformedItem } as unknown as U;

    // Check if a subarray exists in the original item and recurse
    if ((item as any)[childName] && Array.isArray((item as any)[childName])) {
      // Await the result of the recursive call to ensure it's properly resolved
      (newItem as any)[childName] = await recursiveChange((item as any)[childName], transform, childName);
    }

    return newItem;
  }));
};

/**
 * Recursive flattening of a nested array
 * @param {Array} target Source array - Required
 * @returns data - The flattened array
 * @example
 * // Basic Use
 * const flatArray = flatten([1, [2, [3, [4, [5]]]]]);
 * console.log(flatArray); // Output: [1, 2, 3, 4, 5]
 */
export const flatten = <T>(target: any[]): T[] => {
  const result: T[] = [];

  /**
   * Helper function to recursively flatten the array
   * @param {Array} subArray Sub-array to flatten - Required
   */
  const recurse = (subArray: any[]): void => {
    subArray.forEach(el => {
      if (Array.isArray(el)) {
        recurse(el);
      } else {
        result.push(el);
      }
    });
  };

  recurse(target);
  return result;
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
