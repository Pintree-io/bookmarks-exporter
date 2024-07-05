import { Icon } from "@/components/icons"
import { getCopyYear } from "@/utils"

export function MainFooter() {
  return (
    <footer className="text-zinc-600 flex items-center justify-center">
      <span className="mr-3">
        &copy;&nbsp;{getCopyYear()}&nbsp;
        <a href="https://pintree.io" target="_blank" rel="noreferrer">
          Pintree.io
        </a>
      </span>
      <a
        href="https://github.com/Pintree-io/pintree"
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
  )
}
