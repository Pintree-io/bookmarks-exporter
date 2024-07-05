import { Bookmark, Folder } from "@/components/icons"
import { cn } from "@/lib/utils"
import type { TreeProps as AntdTreeProps } from "antd"
import { ConfigProvider, Tooltip, Tree } from "antd"
import * as React from "react"

type BookmarkTreeProps = AntdTreeProps & {
  className?: string
  treeData: any[]
}

export const BookmarkTree: React.FC<BookmarkTreeProps> = ({
  className,
  ...props
}) => {
  const MemoTooltip = Tooltip || React.memo(Tooltip)

  return (
    <ConfigProvider
      theme={{
        components: {
          Tree: {
            colorPrimary: "#2D9C6C",
            nodeHoverBg: "#F5FAF8",
            colorPrimaryHover: "#0BA665"
          }
        }
      }}>
      <Tree
        itemScrollOffset={24}
        rootClassName={cn("w-full", className)}
        checkable
        fieldNames={{ title: "title", key: "id", children: "children" }}
        selectable={false}
        blockNode
        {...props}
        titleRender={(item: any) => (
          <MemoTooltip title={!item?.children ? item.title : undefined}>
            <div className="flex-1 flex items-center">
              <div className="flex items-center flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
                <div className="w-4 h-4 m-1">
                  {item.type === "folder" ? (
                    <Folder className="w-4 h-4" />
                  ) : (
                    !item.url.includes("separator.mayastudios.com") && (
                      <Bookmark className="w-4 h-4" />
                    )
                  )}
                </div>
                <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {item.title}
                </div>
              </div>

              {item?.children ? (
                <div className="px-1.5 rounded-md border text-xs text-black/50">
                  {item.children.length}
                </div>
              ) : (
                ""
              )}
            </div>
          </MemoTooltip>
        )}
      />
    </ConfigProvider>
  )
}
