import { Text } from '@chakra-ui/layout'
import React from 'react'

export default function YesNoColorText({ isActive }: { isActive: boolean }) {
  return (
    <Text color={isActive ? 'green.500' : 'red.500'} textAlign="center">
      {isActive ? '是' : '否'}
    </Text>
  )
}
