import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link as LinkCU, LinkProps } from '@chakra-ui/react'

type Props = LinkProps & {
  to: string
}

const Link: FC<Props> = ({ to, ...rest }) => {
  return (
    <LinkCU
      as={RouterLink}
      to={to}
      color="blueGray.50"
      fontSize="sm"
      fontWeight="semibold"
      {...rest}
    />
  )
}

export default Link
