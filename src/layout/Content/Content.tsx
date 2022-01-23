import { FC } from 'react'

const Content: FC = ({ children }) => {
  return (
    <div className="content">
      <div className="width-limiter">{children}</div>
    </div>
  )
}

export default Content
