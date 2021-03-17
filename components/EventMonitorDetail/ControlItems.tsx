import { HStack, Spacer, Stack, Text } from '@chakra-ui/layout'
import { Switch } from '@chakra-ui/switch'
import { InputNumber, Popover } from 'antd'
import React from 'react'

function ControlItems({ isHandicap }: { isHandicap?: boolean }) {
  return (
    <>
      <InputNumber
        step={0.01}
        size="small"
        placeholder="赔率"
        defaultValue={0.98}
        className="blue"
      />
      <Spacer />
      {/* <InputNumber step={1} size="small" placeholder="盘口" />
      <InputNumber step={25} size="small" placeholder="％" /> */}
      {isHandicap && (
        <>
          <InputNumber
            step={1}
            size="small"
            placeholder="盘口"
            min={0}
            className="orange"
            defaultValue={2}
          />
          <InputNumber
            step={25}
            size="small"
            placeholder="％"
            className="green"
            defaultValue={-100}
            min={-100}
            max={100}
          />
        </>
      )}

      {/* <Switch colorScheme="teal" defaultChecked size="sm" />
      <Switch colorScheme="brown" defaultChecked size="sm" /> */}
      {/* <HStack spacing="3px">
        <span>自结</span>
        <Switch colorScheme="blue" defaultChecked size="sm" />
      </HStack> */}

      <Popover
        content={
          <Stack spacing="sm">
            <Text>实货量：10,000</Text>
            <Text>投注数：100</Text>
          </Stack>
        }
      >
        <Text as="a" color="brown.700" fontWeight="600">
          1.0
        </Text>
      </Popover>
    </>
  )
}

export default ControlItems
