import { Icon, Logo } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { AppContext } from "@/context/app-context"
import { getCopyYear } from "@/utils"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ExportPopup() {
  const navigate = useNavigate()
  const { treeData } = useContext(AppContext)
  const [progress, setProgress] = useState(0)

  const exportData = async (data) => {
    const totalChunks = 10 // Assume the data is divided into 10 blocks
    const chunkSize = Math.ceil(data.length / totalChunks)

    let currentChunk = 0
    let jsonString = ""

    while (currentChunk < totalChunks) {
      const start = currentChunk * chunkSize
      const end = start + chunkSize
      jsonString += JSON.stringify(data.slice(start, end), null, 2)

      currentChunk++
      setProgress(Math.floor((currentChunk / totalChunks) * 100))

      // 模拟延迟以观察进度更新
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bookmarks.json"
    a.click()
    URL.revokeObjectURL(url)

    navigate("/new-page")
  }

  useEffect(() => {
    if (treeData.length) {
      exportData(treeData)
    }
  }, [treeData])

  return (
    <div className="px-[42px] py-[24px] w-[300px] flex flex-col items-center justify-center">
      <Logo className="w-20 h-20" />
      <div className="space-y-4 mt-6 mb-10">
        <h1 className="text-xl font-medium text-center">
          Pintree Bookmarks Exporter
        </h1>
        <p className="text-lg font-light text-zinc-600 text-center">
          Export Your Bookmarks to JSON File
        </p>
      </div>

      <div className="w-full space-y-5">
        <Button
          className="text-[16px] font-light w-full py-4"
          onClick={() => navigate("/bookmark")}>
          Export Bookmarks
        </Button>
        <footer className="text-zinc-600 flex items-center justify-center">
          <span className="mr-3">
            &copy;&nbsp;{getCopyYear()}&nbsp;
            <a href="https://pintree.io" target="_blank" rel="noreferrer">
              Pintree.io
            </a>
          </span>
          <a
            href="htttps://github.com/pintreeio"
            className="flex items-center"
            target="_blank"
            rel="noreferrer">
            <Icon
              icon="grommet-icons:github"
              className="w-3.5 h-3.5 text-zinc-600 mr-1.5 mb-0.5"
            />
            GitHub
          </a>
        </footer>
      </div>
    </div>
  )
}

export default ExportPopup
