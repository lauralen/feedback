import { FC } from 'react'
import { generatePath, Link } from 'react-router-dom'
import { Box, BoxProps } from '@chakra-ui/react'

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
  return (
    <Card
      display="grid"
      gridTemplateColumns={['repeat(2, auto)', '50px 1fr 50px']}
      gridTemplateRows={['repeat(2, auto)', '1fr']}
      gridAutoFlow="column"
      gap={['4', '10']}
      mb="4"
      py="7"
      px="8"
      {...rest}
    >
      <Box gridColumn={['1 / span 2', '2']}>
        {titleComponent}
        <Text my={['2', '3']}>{description}</Text>
        <Tag textTransform="capitalize">{category}</Tag>
      </Box>

      <UpvoteButton width="fit-content" gridColumn="1">
        {upvotes}
      </UpvoteButton>
      <CommentsCount gridColumn={['auto', '3']} justifySelf="end">
        {commentsCount}
      </CommentsCount>
    </Card>
  )
}

export default FeedbackCard
