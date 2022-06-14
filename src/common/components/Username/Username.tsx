import { FC } from 'react'
import { BoxProps } from '@chakra-ui/react'

import Text from 'common/components/Text'

const Username: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Text
      fontSize="sm"
      _before={{
        content: '"@"',
      }}
      {...rest}
    >
      {children}
    </Text>
  )
}

export default Username
