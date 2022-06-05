import { FC } from 'react'
import { Box, useRadio, UseRadioProps } from '@chakra-ui/react'

const RadioCard: FC<UseRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        px={4}
        py={1}
        fontSize="sm"
        fontWeight="semibold"
        cursor="pointer"
        borderRadius="lg"
        color="blue.100"
        bg="gray.100"
        textTransform="capitalize"
        _hover={{
          color: 'blue.100',
          bg: '#CFD7FF',
        }}
        _checked={{
          color: 'white',
          bg: 'blue.100',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCard
