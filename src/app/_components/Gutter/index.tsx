import React, { FC,forwardRef, Ref } from 'react'

interface Props {
  left?: boolean
  right?: boolean
  className?: string
  children?: React.ReactNode
}

export const Gutter: FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { left = true, right = true, className, children } = props

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={className}>
      {left && <div className="left-gutter"></div>}
      <div className="content">{children}</div>
      {right && <div className="right-gutter"></div>}
    </div>
  )
})
