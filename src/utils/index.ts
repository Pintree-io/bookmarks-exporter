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
 * arrayChange([...], (item:T, index:number) => ({ ...item, test:'test' }))
 */
export const arrayChange = <T>(
  target: T[],
  transform: (item: T, index: number) => T,
  childName: string = 'children',
): T[] => {
  return target.map((item, index) => {
    // Create new objects to avoid modifying the original objects
    const newItem = { ...item, ...transform(item, index) };

    // Check if a subarray exists and recurse
    if (newItem[childName] && Array.isArray(newItem[childName])) {
      newItem[childName] = arrayChange(newItem[childName], transform, childName);
    }

    return newItem;
  });
};
