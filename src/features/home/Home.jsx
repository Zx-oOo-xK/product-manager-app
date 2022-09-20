import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  useColorMode,
  Box,
  IconButton,
} from '@chakra-ui/react'

import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Box>
      <IconButton ref={btnRef} colorScheme='dark' onClick={onOpen} aria-label='Search database' icon={<HamburgerIcon />} />
      <IconButton ref={btnRef} colorScheme='dark' onClick={toggleColorMode} aria-label='Search database' icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        display={{ base: 'none', md: 'block' }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
