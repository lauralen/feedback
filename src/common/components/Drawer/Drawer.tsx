import { FC } from 'react'
import {
  Drawer as DrawerCU,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react'

const Drawer: FC<DrawerProps> = ({ children, ...rest }) => {
  return (
    <DrawerCU {...rest}>
      <DrawerContent p="6" bg="gray.100">
        {children}
      </DrawerContent>
      <DrawerOverlay />
    </DrawerCU>
  )
}

export default Drawer
