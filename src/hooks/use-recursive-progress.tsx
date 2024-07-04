import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Recursive change of object array with asynchronous transform function and progress reporting
 * @param {Array} target Source array - Required
 * @param {Function} transform Async callback function, change the data structure - Required
 * @param {Function} onProgress Callback function to report progress - Not required
 * @param {String} childName The key name of the child array, the default is children - Not required
 * @returns data - The new array after the change
 * @example
 * // Basic Use
 * const [data, progress] = useRecursiveChange([...], async (item:T, index:number) => ({ ...item, test:'test' }), (progress) => console.log(progress));
 */
export const useRecursiveProgress = <T, U>(
  target: T[],
  transform: (item: T, index: number) => Promise<U>,
  onProgress?: (progress: number) => void,
  childName: string = "children"
) => {
  const [data, setData] = useState<U[]>([])
  const [progress, setProgress] = useState<number>(0)
  const prevProgressRef = useRef<number>(0)

  const recursiveChange = useCallback(
    async (
      target: T[],
      transform: (item: T, index: number) => Promise<U>,
      childName: string = "children",
      onProgress?: (progress: number) => void
    ) => {
      let totalItems = 0
      let processedItems = 0

      // Helper function to count total items
      const countItems = (array: T[]) => {
        totalItems += array.length
        array.forEach((item) => {
          if (
            (item as any)[childName] &&
            Array.isArray((item as any)[childName])
          ) {
            countItems((item as any)[childName])
          }
        })
      }

      countItems(target)

      const processArray = async (array: T[]) => {
        return Promise.all(
          array.map(async (item, index) => {
            const transformedItem = await transform(item, index)

            if (
              typeof transformedItem !== "object" ||
              transformedItem === null
            ) {
              processedItems++
              const currentProgress = (processedItems / totalItems) * 100
              if (currentProgress !== prevProgressRef.current) {
                prevProgressRef.current = currentProgress
                onProgress && onProgress(currentProgress)
              }
              return transformedItem
            }

            let newItem = { ...transformedItem } as unknown as U

            if (
              (item as any)[childName] &&
              Array.isArray((item as any)[childName])
            ) {
              ;(newItem as any)[childName] = await processArray(
                (item as any)[childName]
              )
            }

            processedItems++
            const currentProgress = (processedItems / totalItems) * 100
            if (currentProgress !== prevProgressRef.current) {
              prevProgressRef.current = currentProgress
              onProgress && onProgress(currentProgress)
            }
            return newItem
          })
        )
      }

      return processArray(target)
    },
    []
  )

  useEffect(() => {
    const transformData = async () => {
      const result = await recursiveChange(
        target,
        transform,
        childName,
        (progress) => {
          setProgress(progress)
          onProgress && onProgress(progress)
        }
      )
      setData(result)
    }

    transformData()
  }, [target, transform, childName, recursiveChange, onProgress])

  return [data, progress] as [U[], number]
}
