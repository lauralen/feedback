import { FC } from 'react'
import { generatePath, Link } from 'react-router-dom'
import { BoxProps, Flex } from '@chakra-ui/react'

import Card from 'common/components/Card'
import H3 from 'common/components/H3'
import Tag from 'common/components/Tag'
import Text from 'common/components/Text'
import UpvoteButton from 'common/components/UpvoteButton'
import { Feedback as Data } from 'common/types'

import CommentsCount from './components/CommentsCount'

type Props = BoxProps & {
  data: Data
  withLink?: boolean
}

const FeedbackCard: FC<Props> = ({ data, withLink, ...rest }) => {
  const { title, description, category, upvotes, comments } = data
  const commentsCount = comments?.length

  const titleComponent = <H3>{title}</H3>

  return (
    <Card mb="4" p="6" {...rest}>
      {withLink ? (
        <Link
          key={data.id}
          to={generatePath('/feedback/:id', {
            id: String(data.id),
          })}
        >
          {titleComponent}
        </Link>
      ) : (
        <>{titleComponent}</>
      )}
      <Text my="2">{description}</Text>
      <Tag mb="4" textTransform="capitalize">
        {category}
      </Tag>
      <Flex justify="space-between">
        <UpvoteButton>{upvotes}</UpvoteButton>
        {commentsCount && <CommentsCount>{commentsCount}</CommentsCount>}
      </Flex>
    </Card>
  )
}

export default FeedbackCard
