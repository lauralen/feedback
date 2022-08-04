import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { LinkProps } from '@chakra-ui/react'
import { ReactComponent as LeftArrowIcon } from 'assets/icons/icon-arrow-left.svg'

import Link from 'common/components/Link'

type Props = LinkProps & {
  to?: string
}

const GoBackLink: FC<Props> = ({ to = '/', ...rest }) => {
  return (
    <Link to={to} display="flex" alignItems="center" {...rest}>
      <LeftArrowIcon />
      <Box as="span" ml="3">
        Go back
      </Box>
    </Link>
  )
}

export default GoBackLink
