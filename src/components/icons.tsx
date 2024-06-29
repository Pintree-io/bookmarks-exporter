import type { SVGProps } from "react"

export type Props = SVGProps<SVGSVGElement>

export { Icon } from "@iconify/react"

const defaultProps = {
  width: 24,
  height: 24
} as const

export const Logo = (props: Props) => {
  return (
    <svg viewBox="0 0 512 512" {...defaultProps} {...props}>
      <g clip-path="url(#clip0_41_3509)">
        <rect width="512" height="512" rx="256" fill="#2D9C6C" />
        <g clip-path="url(#clip1_41_3509)">
          <path
            d="M223.952 341.333H287.952V420.571L255.952 389.799L223.952 420.571V341.333Z"
            fill="#FCB11E"
          />
          <path
            d="M361.143 248.381L256 91.4286L150.857 248.381H186.444L124.952 341.333H387.048L325.556 248.381H361.143Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_41_3509">
          <rect width="512" height="512" fill="white" />
        </clipPath>
        <clipPath id="clip1_41_3509">
          <rect
            width="262.095"
            height="329.143"
            fill="white"
            transform="translate(124.952 91.4286)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
