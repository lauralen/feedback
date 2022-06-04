import { FC } from 'react'
import { Tag as TagCU, TagProps } from '@chakra-ui/react'

const Tag: FC<TagProps> = ({ ...rest }) => {
  return (
    <TagCU
      py="1"
      px="4"
      color="blue.100"
      bg="gray.100"
      lineHeight="shorter"
      fontSize="sm"
      fontWeight="semibold"
      {...rest}
    />
  )
}

export default Tag
