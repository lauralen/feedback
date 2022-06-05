import { FC } from 'react'
import { FormHelperText, HelpTextProps } from '@chakra-ui/react'

const FormHelper: FC<HelpTextProps> = ({ ...rest }) => {
  return <FormHelperText mt="1" mb="4" color="blueGray.50" {...rest} />
}

export default FormHelper
