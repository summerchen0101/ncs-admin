import { Box, Collapse, Icon, Text, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { HiOutlineUser } from 'react-icons/hi'

const MenuItem: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box w="100%" color="white">
      <Box w="100%" py="3" px="5" cursor="pointer" shadow="sm">
        <Text
          onClick={onToggle}
          fontWeight="500"
          letterSpacing="2px"
          textShadow="1px 0px rgba(0,0,0,0.2)"
        >
          <Icon as={HiOutlineUser} verticalAlign="text-bottom" mr="2" />
          第一層選單
        </Text>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <Box bg="teal.700">
          {Array(4)
            .fill('')
            .map((_, i) => (
              <Link key={i} href="/">
                <Box py="3" px="5" shadow="sm" cursor="pointer">
                  <Text
                    fontWeight="500"
                    letterSpacing="2px"
                    color="gray.200"
                    textShadow="1px 0px rgba(0,0,0,0.2)"
                    ml="6"
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
