import { FC } from 'react'
import { Box, Select as SelectCU, SelectProps } from '@chakra-ui/react'

type Option = { label: string; value: string }

type Props = SelectProps & {
  options: Option[]
}

const Select: FC<Props> = ({ options, ...rest }) => {
  return (
    <SelectCU
      color="blueGray.100"
      borderColor="transparent"
      bg="gray.50"
      _focus={{ borderColor: 'blue.100' }}
      {...rest}
    >
      {options.map(({ label, value }) => {
        return (
          <Box as="option" key={value} value={value} color="blueGray.100">
            {label}
          </Box>
        )
      })}
    </SelectCU>
  )
}

export default Select
