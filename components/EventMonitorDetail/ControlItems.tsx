import Icon from '@chakra-ui/icon'
import { HStack, Spacer, Text, Stack } from '@chakra-ui/layout'
import { Switch } from '@chakra-ui/switch'
import { InputNumber, Popover } from 'antd'
import React, { useEffect } from 'react'
import { HiInformationCircle } from 'react-icons/hi'

function ControlItems({ isHandicap }: { isHandicap?: boolean }) {
  return (
    <>
      <InputNumber step={0.01} size="small" placeholder="賠率" />
      <InputNumber step={1} size="small" placeholder="盤口" />
      <InputNumber step={25} size="small" placeholder="％" />
      {/* {isHandicap ? (
        <>
          <InputNumber step={1} size="small" placeholder="盤口" />
          <InputNumber step={25} size="small" placeholder="％" />
        </>
      ) : (
        <Spacer />
      )} */}

      {/* <Switch colorScheme="teal" defaultChecked size="sm" />
      <Switch colorScheme="brown" defaultChecked size="sm" /> */}
      {/* <span>自結</span> */}
      <Switch colorScheme="blue" defaultChecked size="sm" />

      <Popover
        content={
          <Stack spacing="sm">
            <Text>實貨量：10,000</Text>
            <Text>投注數：100</Text>
          </Stack>
        }
      >
        <Icon as={HiInformationCircle} fontSize="15px" />
      </Popover>
    </>
  )
}

export default ControlItems
