import Icon from '@chakra-ui/icon'
import { Text, VStack } from '@chakra-ui/layout'
import { Switch } from '@chakra-ui/switch'
import { InputNumber, Popover } from 'antd'
import React, { useEffect } from 'react'
import { HiInformationCircle } from 'react-icons/hi'

function ControlItems() {
  return (
    <>
      <InputNumber step={0.05} size="small" placeholder="賠率" />
      <Switch colorScheme="teal" defaultChecked />
      <Switch colorScheme="orange" defaultChecked />

      <Popover
        content={
          <VStack alignItems="start" spacing="sm">
            <Text>實貨量：10,000</Text>
            <Text>投注數：100</Text>
          </VStack>
        }
      >
        <Icon as={HiInformationCircle} fontSize="15px" />
      </Popover>
    </>
  )
}

export default ControlItems
