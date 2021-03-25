import { OddsWithBet } from '@/types/api/Handicap'
import useOddsService from '@/utils/services/useOddsService'
import useTransfer from '@/utils/useTransfer'
import { Spacer, Stack, Text } from '@chakra-ui/layout'
import { InputNumber, Popover } from 'antd'
import numeral from 'numeral'
import React, { useRef, useState } from 'react'

interface ControlItemsProps {
  isHandicap?: boolean
  odds?: OddsWithBet
  side?: 'home' | 'away'
}

function ControlItems({ isHandicap, odds, side = 'home' }: ControlItemsProps) {
  const { toCurrency } = useTransfer()
  const { addOdds } = useOddsService()
  if (!odds)
    return (
      <Text ml="5px" color="gray.500">
        (无资料)
      </Text>
    )

  const [finalOdds, setFinalOdds] = useState(() =>
    numeral(odds[`${side}_odds`]).add(odds[`${side}_fix_odds`]).value(),
  )
  const handleOddsChanged = async (value: number) => {
    if (value === finalOdds) return
    const incr_odds = numeral(value).subtract(finalOdds).value()
    await addOdds({
      id: odds.id,
      incr_odds,
      is_home: side === 'home',
    })
    setFinalOdds(value)
  }
  return (
    <>
      <Text as="span" w="50px" textAlign="right" color="gray.500" fontSize="xs">
        {odds[`${side}_odds`]}
      </Text>
      <InputNumber
        step={0.01}
        size="small"
        placeholder="赔率"
        value={finalOdds}
        // onChange={handleOddsChanged}
        onPressEnter={(e) => handleOddsChanged(+e.currentTarget.value)}
        onStep={handleOddsChanged}
        className="blue"
        style={{ width: '82px' }}
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
            <Text>实货量：{toCurrency(odds[`${side}_bet_sum`])}</Text>
            <Text>投注数：{toCurrency(odds[`${side}_bet_count`])}</Text>
          </Stack>
        }
      >
        <Text as="a" color="brown.700" fontWeight="600">
          {numeral(odds[`${side}_bet_sum`]).divide(10000).value()}
        </Text>
      </Popover>
    </>
  )
}

export default ControlItems
