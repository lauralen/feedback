import { Box } from '@chakra-ui/react'
import { ReactComponent as LeftArrowIcon } from 'assets/icons/icon-arrow-left.svg'

import Card from 'common/components/Card'
import Link from 'common/components/Link'

function Feedbacks() {
  return (
    <>
      <Link to="/" display="flex" alignItems="center">
        <LeftArrowIcon />
        <Box as="span" ml="3">
          Go back
        </Box>
      </Link>
      <Card></Card>
    </>
  )
}

export default Feedbacks
