import { FC } from 'react'
import { Box, Select as SelectCU, SelectProps } from '@chakra-ui/react'

interface Props extends SelectProps {
  options: string[]
}

const Select: FC<Props> = ({ options, ...rest }) => {
  return (
    <SelectCU {...rest}>
      {options.map((option) => {
        return (
          <Box as="option" key={option} value={option} color="blueGray.100">
            {option}
          </Box>
        )
      })}
    </SelectCU>
  )
}

export default Select
