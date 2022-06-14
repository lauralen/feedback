import { FC } from 'react'
import { BoxProps, List } from '@chakra-ui/react'

import { Comment as CommentType } from 'common/types'

import Base from './components/base'

type Props = BoxProps & {
  data: CommentType
}

const Comment: FC<Props> = ({ data, ...rest }) => {
  return (
    <>
      <Base data={data} {...rest} />
      {data?.replies && (
        <List>
          {data.replies.map((reply) => (
            <Base as="li" key={reply.user.username} data={reply} />
          ))}
        </List>
      )}
    </>
  )
}

export default Comment
