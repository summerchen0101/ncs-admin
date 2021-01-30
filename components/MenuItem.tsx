import {
  useDisclosure,
  Box,
  Button,
  Collapse,
  Text,
  MenuList,
  MenuItem as CMenuItem,
} from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'

const MenuItem: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box w="100%" mb="10px">
      <Button onClick={onToggle} w="100%">
        第一層選單
      </Button>
      <Collapse in={isOpen} animateOpacity>
        {Array(4)
          .fill('')
          .map((_, i) => (
            <Box key={i} shadow="md" p="12px" textAlign="center">
              <Text as={Link} href="/">
                第二層選單
              </Text>
            </Box>
          ))}
      </Collapse>
    </Box>
  )
}

export default MenuItem
