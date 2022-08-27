import { FC } from 'react'
import { useNavigate } from 'react-router'
import { Box } from '@chakra-ui/react'
import { ReactComponent as LeftArrowIcon } from 'assets/icons/icon-arrow-left.svg'

import Button, { Props } from '../Button/Button'

const GoBackButton: FC<Props> = (props) => {
  const navigate = useNavigate()

  return (
    <Button
      display="flex"
      alignItems="center"
      p="0"
      color="blueGray.50"
      variant="transparent"
      _hover={{ textDecoration: 'underline' }}
      onClick={() => navigate(-1)}
      {...props}
    >
      <LeftArrowIcon />
      <Box as="span" ml="3">
        Go back
      </Box>
    </Button>
  )
}

export default GoBackButton
