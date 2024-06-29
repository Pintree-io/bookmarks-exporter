import { Icon, Logo } from "./components/icons"

import "./style.css"

import { Button } from "@/components/ui/button"
import { getCopyYear } from "@/utils"

function IndexPopup() {
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
        <Button className="text-[16px] font-light w-full py-4">
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

export default IndexPopup
