import { Odds } from '@/types/api/Odds'
import { HStack, Stack, Text } from '@chakra-ui/layout'
import React from 'react'
import ControlItems from './ControlItems'

function PlayCtrlH({ odds }: { odds: Odds[] }) {
  return (
    <Stack>
      <HStack spacing="2">
        <Text>主</Text>
        <ControlItems isHandicap />
      </HStack>
      <HStack spacing="2">
        <Text>客</Text>
        <ControlItems isHandicap />
      </HStack>
    </Stack>
  )
}

export default PlayCtrlH
