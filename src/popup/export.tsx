import { Export } from "@/components/icons"
import { Progress } from "@/components/ui/progress"
import { AppContext } from "@/context/app-context"
import type { ChangedTreeData } from "@/types/bookmarks"
import { delay, getClearbitLogoUrl } from "@/utils"
import { recursiveChange } from "@/utils/tree"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface ExportTreeDataProps {
  type: "folder" | "link"
  addDate: number
  title: string
  icon?: string
  url: string
}

function ExportPopup() {
  const navigate = useNavigate()
  const { treeData, setTreeData } = useContext(AppContext)
  const [progress, setProgress] = useState(0)

  const exportData = async () => {
    // 处理数据
    const bookmarks = await recursiveChange<
      ChangedTreeData,
      ExportTreeDataProps
    >(treeData as ChangedTreeData[], async (item, _index: number) => {
      if (item.type === "link") {
        const logoUrl = await getClearbitLogoUrl(item.url)
        return {
          type: item.type,
          addDate: item.dateAdded,
          title: item.title,
          icon: logoUrl,
          url: item.url
        }
      }
      return {
        type: item.type,
        addDate: item.dateAdded,
        title: item.title,
        url: item.url
      }
    })

    setTreeData(bookmarks)
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      setProgress(30)
      await delay()
      await exportData()
      await delay()
      setProgress(60)
      await delay()
      setProgress(100)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress === 100) {
        navigate("/finish")
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="py-6 w-[300px] flex flex-col items-center justify-center">
      <Export className="w-32 h-32" />

      <div className="px-8 w-full mt-4 mb-10">
        <Progress className="h-2" value={progress} />
      </div>

      <div className="px-10 w-full space-y-3 text-center">
        <h1 className="text-xl">Exporting...</h1>
        <p className="text-zinc-500 text-lg font-light">
          Seat comfortable, this can take a while.
        </p>
      </div>
    </div>
  )
}

export default ExportPopup
