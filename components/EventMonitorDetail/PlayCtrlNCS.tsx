import { OddsWithBet } from '@/types/api/Handicap'
import { Odds } from '@/types/api/Odds'
import { HStack, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import React, { useMemo } from 'react'
import ControlItems from './ControlItems'
import _ from 'lodash'

function PlayCtrlNCS({ odds }: { odds: OddsWithBet[] }) {
  const oddsByHomePoint = useMemo(
    () =>
      _(odds)
        .groupBy((odd) => odd.home_point)
        .map()
        .value(),
    [odds],
  )
  return (
    <HStack spacing="3">
      {oddsByHomePoint.map((_odds, i) => (
        <Stack key={i}>
          {_odds.map((d) => (
            <HStack key={d.id} spacing="1" whiteSpace="nowrap">
              <Text color="teal.500" fontWeight="bold">
                {d.home_point}-{d.away_point}
              </Text>
              <ControlItems odds={d} />
            </HStack>
          ))}
        </Stack>
      ))}
    </HStack>
  )
}

export default PlayCtrlNCS
