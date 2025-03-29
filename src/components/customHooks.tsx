import { useEffect, useState, type RefObject } from "react"

export const useWindowSize = (): {
  width: number,
  height: number
} => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const windowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', windowResize)

    windowResize()

    return () => window.removeEventListener('resize', windowResize)
  }, [])

  return windowSize
}

export const useContainerDimension = (ref: RefObject<HTMLDivElement | null>) => {
  const [dimention, setDimention] = useState<{width: number | undefined, height: number | undefined}>({width: 0, height: 0})

  useEffect(() => {
    const getDimention = () => ({
      width: ref.current?.offsetWidth,
      height: ref.current?.offsetHeight
    })

    const handleResize = () => {
      setDimention(getDimention())
    }

    if (ref.current) {
      setDimention(getDimention());
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [ref])

  return dimention
}