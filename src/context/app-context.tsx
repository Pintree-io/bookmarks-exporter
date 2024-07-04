import type { TreeDataNode } from "@/types/bookmarks"
import type { ReactNode } from "react"
import React, { createContext, useState } from "react"

interface AppContextProps {
  treeData: TreeDataNode[]
  setTreeData: React.Dispatch<React.SetStateAction<any[]>>
}

export const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [treeData, setTreeData] = useState([])

  return (
    <AppContext.Provider value={{ treeData, setTreeData }}>
      {children}
    </AppContext.Provider>
  )
}
