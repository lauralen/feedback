import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { ReactComponent as LeftArrowIcon } from 'assets/icons/icon-arrow-left.svg'

import Link from 'common/components/Link'

type Props = {
  to?: string
}

const GoBackLink: FC<Props> = ({ to = '/' }) => {
  return (
    <Link to={to} display="flex" alignItems="center">
      <LeftArrowIcon />
      <Box as="span" ml="3">
        Go back
      </Box>
    </Link>
  )
}

export default GoBackLink
