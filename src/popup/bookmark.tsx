import { BookmarkTree } from "@/components/bookmark-tree"
import { Icon, Loading } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { AppContext } from "@/context/app-context"
import type { ChangedTreeData, TreeDataNode } from "@/types/bookmarks"
import { getChromeBookmarks } from "@/utils/bookmark/chrome"
import { recursiveChange, recursiveFind } from "@/utils/tree"
import type { TreeProps } from "antd"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function BookmarkPopup() {
  const navigate = useNavigate()
  const { setTreeData } = useContext(AppContext)

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])

  const onCheck: TreeProps["onCheck"] = (selectedKeys: string[], _info) => {
    setCheckedKeys(selectedKeys)
  }

  const getBookmarks = async () => {
    try {
      const result = await getChromeBookmarks()
      const bookmarks = await recursiveChange<TreeDataNode, ChangedTreeData>(
        result[0].children,
        async (item, _index: number) => ({
          ...item,
          type: item?.children ? "folder" : "link"
        })
      )
      console.log(bookmarks)

      setData(bookmarks)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportBookmarks = () => {
    const result = recursiveFind<TreeDataNode>(data, (item, _index: number) =>
      checkedKeys.includes(item.id)
    )
    setTreeData(result)
    navigate("/export")
  }

  useEffect(() => {
    getBookmarks()
  }, [])

  return (
    <div className="p-4 w-[300px] flex flex-col justify-center">
      <h1 className="text-lg mb-4">Select Bookmarks</h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 h-72 border">
          <Loading className="fill-transparent h-14 w-14 animate-spin" />
          <div className="text-xl">Loading...</div>
        </div>
      ) : (
        <div className="h-72 w-full">
          <BookmarkTree
            className="w-full"
            checkedKeys={checkedKeys}
            height={287}
            treeData={data}
            onCheck={onCheck}
          />
        </div>
      )}

      <div className="px-6 mt-4 py-2">
        <Button
          disabled={loading || !checkedKeys.length}
          className="text-[16px] font-light w-full py-4 flex items-center justify-center"
          onClick={() => handleExportBookmarks()}>
          Continue
          <Icon icon="akar-icons:arrow-right" className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default BookmarkPopup
