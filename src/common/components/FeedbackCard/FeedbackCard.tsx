import { FC } from 'react'
import { generatePath, Link } from 'react-router-dom'
import { Box, BoxProps, Flex } from '@chakra-ui/react'

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
  const commentsCount = comments?.length ?? 0

  const titleHeading = <H3>{title}</H3>
  const titleComponent = withLink ? (
    <Link
      key={data.id}
      to={generatePath('/feedback/:id', {
        id: String(data.id),
      })}
    >
      {titleHeading}
    </Link>
  ) : (
    <>{titleHeading}</>
  )
  const upvoteButton = <UpvoteButton>{upvotes}</UpvoteButton>
  const descriptionComponent = <Text my="2">{description}</Text>
  const commentsCountComponent = <CommentsCount>{commentsCount}</CommentsCount>
  const categoryComponent = (
    <Tag mb={[4, 0]} textTransform="capitalize">
      {category}
    </Tag>
  )

  return (
    <>
      <Card display={['block', 'none']} mb="4" p="6" {...rest}>
        {titleComponent}
        {descriptionComponent}
        {categoryComponent}
        <Flex justify="space-between">
          {upvoteButton}
          {commentsCountComponent}
        </Flex>
      </Card>

      <Card
        display={['none', 'flex']}
        justifyContent="space-between"
        gap="10"
        mb="4"
        py="7"
        px="8"
        {...rest}
      >
        {upvoteButton}

        <Box flexGrow="1">
          {titleComponent}
          {descriptionComponent}
          {categoryComponent}
        </Box>

        {commentsCountComponent}
      </Card>
    </>
  )
}

export default FeedbackCard
