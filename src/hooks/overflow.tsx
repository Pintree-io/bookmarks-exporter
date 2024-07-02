import { useEffect, useRef, useState } from "react"

function useOverflow(ref) {
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth)
        setWidth(ref.current.clientWidth)
      }
    }

    checkOverflow()

    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [ref])

  return { isOverflowing, width }
}

export default useOverflow
