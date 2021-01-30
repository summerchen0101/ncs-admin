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
    <Box w="100%" mb="10px" color="white">
      <Box w="100%" p="3" cursor="pointer" shadow="sm">
        <Text
          onClick={onToggle}
          fontWeight="500"
          letterSpacing="2px"
          textShadow="1px 0px rgba(0,0,0,0.2)"
        >
          第一層選單
        </Text>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <Box bg="teal.700">
          {Array(4)
            .fill('')
            .map((_, i) => (
              <Link key={i} href="/">
                <Box p="12px" shadow="sm" cursor="pointer">
                  <Text
                    fontWeight="500"
                    letterSpacing="2px"
                    color="gray.200"
                    textShadow="1px 0px rgba(0,0,0,0.2)"
                    ml="3"
                  >
                    第二層選單
                  </Text>
                </Box>
              </Link>
            ))}
        </Box>
      </Collapse>
    </Box>
  )
}

export default MenuItem
