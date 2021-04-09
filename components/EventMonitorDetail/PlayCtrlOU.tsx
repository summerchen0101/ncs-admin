import { Odds } from '@/types/api/Odds'
import { HStack, Stack, Text } from '@chakra-ui/layout'
import React from 'react'
import ControlItems from './ControlItems'

function PlayCtrlOU({ odds }: { odds: Odds[] }) {
  return (
    <Stack>
      <HStack spacing="2">
        <Text>大</Text>
        <ControlItems isHandicap />
      </HStack>
      <HStack spacing="2">
        <Text>小</Text>
        <ControlItems />
      </HStack>
    </Stack>
  )
}

export default PlayCtrlOU
