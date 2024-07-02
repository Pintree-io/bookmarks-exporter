import type { TreeDataNode } from "antd"
import React, { createContext, useState } from "react"
import type { ReactNode } from "react"

interface AppContextProps {
  treeData: TreeDataNode[]
  setTreeData: React.Dispatch<React.SetStateAction<TreeDataNode[]>>
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
