// import { Logo } from "@/components/icons"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const AppOverlay = () => {
  return (
    <div className="z-50 flex fixed top-32 right-4">
      {/* <Logo className="w-10 h-10 border rounded-full" /> */}
    </div>
  )
}

export default AppOverlay
