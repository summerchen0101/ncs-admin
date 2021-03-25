import { OddsWithBet } from '@/types/api/Handicap'
import useOddsService from '@/utils/services/useOddsService'
import useTransfer from '@/utils/useTransfer'
import { Spacer, Stack, Text } from '@chakra-ui/layout'
import { InputNumber, Popover } from 'antd'
import numeral from 'numeral'
import React, { useRef, useState } from 'react'

function ControlItems({
  isHandicap,
  odds,
}: {
  isHandicap?: boolean
  odds?: OddsWithBet
}) {
  const { toCurrency } = useTransfer()
  const { addOdds } = useOddsService()
  const [finalOdds, setFinalOdds] = useState(() =>
    numeral(odds.home_odds).add(odds.home_fix_odds).value(),
  )
  const handleOddsChanged = async (value: number) => {
    if (value === finalOdds) return
    const incr_odds = numeral(value).subtract(finalOdds).value()
    await addOdds({
      id: odds.id,
      incr_odds,
      is_home: true,
    })
    setFinalOdds(value)
  }
  if (!odds) return <>empty</>
  return (
    <>
      <InputNumber
        step={0.01}
        size="small"
        placeholder="赔率"
        value={finalOdds}
        onChange={handleOddsChanged}
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
            <Text>实货量：{toCurrency(odds.home_bet_sum)}</Text>
            <Text>投注数：{toCurrency(odds.home_bet_count)}</Text>
          </Stack>
        }
      >
        <Text as="a" color="brown.700" fontWeight="600">
          {numeral(odds.home_bet_sum).divide(10000).value()}
        </Text>
      </Popover>
    </>
  )
}

export default ControlItems
