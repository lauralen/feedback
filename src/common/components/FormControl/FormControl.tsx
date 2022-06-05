import { FC } from 'react'
import {
  FormControl as FormControlCU,
  FormControlProps,
} from '@chakra-ui/react'

const FormControl: FC<FormControlProps> = ({ ...rest }) => {
  return <FormControlCU mb="6" {...rest} />
}

export default FormControl
