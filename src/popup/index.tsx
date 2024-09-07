import "@/style.css"

import { AppProvider } from "@/context/app-context"
import { ConfigProvider } from "antd"
import {
  Route,
  HashRouter as Router,
  Routes,
  useLocation
} from "react-router-dom"

import Bookmark from "./bookmark"
import Export from "./export"
import Finish from "./finish"
import GitSetting from "./git-setting"
import Home from "./home"

function IndexPopup() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2D9C6C",
          colorPrimaryHover: "#0BA665"
        },
        components: {
          Tree: {
            nodeHoverBg: "#F5FAF8"
          }
        }
      }}>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/export" element={<Export />} />
            <Route path="/git-setting" element={<GitSetting />} />
            <Route path="/finish" element={<Finish />} />
          </Routes>
        </Router>
      </AppProvider>
    </ConfigProvider>
  )
}

export default IndexPopup
