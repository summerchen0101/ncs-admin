import { Box, Center, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const Logo: React.FC = () => {
  return (
    <Center textAlign="center" h="60px" mt="10px">
      {/* <Text
        color="brand.200"
        fontSize="20px"
        letterSpacing="3px"
        fontWeight="500"
      >
        ST反波膽
      </Text> */}
      <Image src="/logo.png" h="50px" />
    </Center>
  )
}

export default Logo
