import { FC } from 'react'
import { FormLabel as FormLabelCU, FormLabelProps } from '@chakra-ui/react'

const FormLabel: FC<FormLabelProps> = ({ ...rest }) => {
  return <FormLabelCU mb="1" color="blueGray.100" fontWeight="bold" {...rest} />
}

export default FormLabel
