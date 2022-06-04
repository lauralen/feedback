import { FC } from 'react'
import { Spinner as SpinnerCU, SpinnerProps } from '@chakra-ui/react'

const Spinner: FC<SpinnerProps> = ({ ...rest }) => {
  return (
    <SpinnerCU
      color="purple"
      emptyColor="blue.100"
      speed="0.65s"
      thickness="3px"
      size="xl"
      {...rest}
    />
  )
}

export default Spinner
