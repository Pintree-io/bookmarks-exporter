import "@/style.css"

import { AppProvider } from "@/context/app-context"
import { Route, HashRouter as Router, Routes } from "react-router-dom"

import Bookmark from "./bookmark"
import Home from "./home"

function IndexPopup() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default IndexPopup
