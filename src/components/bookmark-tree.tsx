import { Bookmark, Folder } from "@/components/icons"
import { cn } from "@/lib/utils"
import type { TreeProps } from "antd"
import { ConfigProvider, Tooltip, Tree } from "antd"
import * as React from "react"

export interface BookmarkTreeProps extends TreeProps {
  className?: string
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
          <MemoTooltip
            className="flex items-center justify-between"
            title={!item?.children ? item.title : undefined}>
            <div className="flex items-center justify-between">
              <span className="w-3.5 h-3.5 mx-1">
                {!item.isLeaf ? (
                  <Folder className="w-3.5 h-3.5" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </span>
              <span className="w-40 whitespace-nowrap overflow-hidden overflow-ellipsis">
                {item.title}
              </span>
            </div>

            {item?.children ? (
              <div className="px-1.5 rounded-md border text-xs text-black/50">
                {item.children.length}
              </div>
            ) : (
              ""
            )}
          </MemoTooltip>
        )}
      />
    </ConfigProvider>
  )
}
