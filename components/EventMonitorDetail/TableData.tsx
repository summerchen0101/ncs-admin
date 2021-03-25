import { Play, Section } from '@/lib/enums'
import { playOpts, sectionOpts } from '@/lib/options'
import { HandicapWithOdds, OddsWithBet } from '@/types/api/Handicap'
import { Odds } from '@/types/api/Odds'
import useHandicapAPI from '@/utils/apis/useHandicapAPI'
import useErrorHandler from '@/utils/useErrorHandler'
import useStorage from '@/utils/useStorage'
import useTransfer from '@/utils/useTransfer'
import {
  Box,
  HStack,
  Spacer,
  Stack,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { InputNumber, Popover, Select } from 'antd'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import MyCheckBox from '../MyCheckBox'
import PlayCtrlH from './PlayCtrlH'
import PlayCtrlNCS from './PlayCtrlNCS'
import PlayCtrlOU from './PlayCtrlOU'
import PlaySelector from './PlaySelector'
import _ from 'lodash'

const getPlayCtrl = (play: Play, odds: OddsWithBet[]) => {
  const playComps = {
    [Play.NCS]: PlayCtrlNCS,
    [Play.Total]: PlayCtrlOU,
    [Play.Spread]: PlayCtrlH,
  }
  const PlayComp = playComps[play]
  return <PlayComp odds={odds} />
}

function TableData() {
  const [eventIds] = useStorage<number[]>('eventIds')
  const [sectionCode, setSectionCode] = useState(Section.Full)
  const [list, setList] = useState<HandicapWithOdds[]>([])
  const { apiErrHandler } = useErrorHandler()
  const { toEventId, toDateTime, toOptionName } = useTransfer()
  const API = useHandicapAPI()
  const [displayPlays, setDisplayPlays] = useState<Play[]>([])

  const eventsWithOddsByPlay = useMemo(() => {
    return list.map((t) => ({
      ...t,
      odds: _.groupBy(t.odds, (odd) => odd.play_code),
    }))
  }, [list])

  // const { checked, addChecked, subChecked } = useCheckList(playOpts)

  const fetchEvents = async () => {
    try {
      const res = await API.fetchCtrlList({
        ids: eventIds,
        section_code: sectionCode,
      })
      setList(res.data.list)
    } catch (err) {
      apiErrHandler(err)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [sectionCode])
  return (
    <Box className="monitor">
      <HStack
        mb="3"
        pos="fixed"
        top="0"
        w="100vw"
        zIndex="9"
        bg="white"
        pt="2"
        px="3"
        shadow="md"
        wrap="wrap"
      >
        <Text fontSize="16px" fontWeight="bold" mx="2" mb="2">
          欧足
        </Text>

        <Select
          options={sectionOpts}
          placeholder="场次"
          defaultValue={Section.Full}
          onChange={(v) => setSectionCode(v)}
          style={{ width: '150px', marginBottom: '10px' }}
        />
        <HStack mb="2">
          <span>开赛</span>
          <Switch colorScheme="teal" defaultChecked size="sm" />
          <span>下注</span>
          <Switch colorScheme="brown" defaultChecked size="sm" />
          <span>自结</span>
          <Switch colorScheme="blue" defaultChecked size="sm" />
        </HStack>
        <Spacer />
        <HStack mb="2">
          <PlaySelector
            onChange={(value) => setDisplayPlays(value as Play[])}
            value={displayPlays}
          />
        </HStack>
      </HStack>
      <Box
        w="100vw"
        h="100vh"
        overflow="auto"
        border="1px solid #eee"
        pt={['105px', '47px']}
        pos="fixed"
      >
        <Table size="sm" variant="striped" whiteSpace="nowrap">
          <Thead>
            <Tr bg="gray.500">
              <Th color="white" py="2" colSpan={3}>
                赛事队伍资讯/玩法
              </Th>

              {playOpts
                .filter((p) => displayPlays.includes(p.value))
                .map((t) => (
                  <Th key={t.value} color="white">
                    {t.label}
                  </Th>
                ))}
            </Tr>
          </Thead>
          <Tbody>
            {eventsWithOddsByPlay.map((e) => (
              <Fragment key={e.id}>
                <Tr>
                  <Td colSpan={3}>
                    <HStack>
                      <Text color="orange.500" fontWeight="bold">
                        {toEventId(e.id)}
                      </Text>
                      <Text fontWeight="bold">{e.team_home.league_name}</Text>
                      <Text>{toDateTime(e.play_at)}</Text>
                    </HStack>
                  </Td>
                  {playOpts
                    .filter((p) => displayPlays.includes(p.value))
                    .map((p) => (
                      <Td key={p.value}>
                        <HStack>
                          {p.value !== Play.NCS && (
                            <>
                              <MyCheckBox defaultChecked size="sm">
                                平
                              </MyCheckBox>
                              <InputNumber
                                step={0.01}
                                size="small"
                                defaultValue={1.86}
                                placeholder="平水值"
                              />
                            </>
                          )}
                          <HStack spacing="3px">
                            <span>开赛</span>
                            <Switch colorScheme="teal" size="sm" />
                          </HStack>
                          <HStack spacing="3px">
                            <span>下注</span>
                            <Switch colorScheme="brown" size="sm" />
                          </HStack>
                          <Spacer />
                          <Popover
                            content={
                              <Stack spacing="sm">
                                <Text>实货量：32,000</Text>
                                <Text>投注数：200</Text>
                              </Stack>
                            }
                          >
                            {/* <Icon as={HiInformationCircle} fontSize="17px" /> */}
                            <Text as="a" color="brown.700" fontWeight="600">
                              3.2
                            </Text>
                          </Popover>
                        </HStack>
                      </Td>
                    ))}
                </Tr>
                <Tr>
                  <Td borderRight="1px solid #eee">
                    <Stack>
                      <Text fontWeight="bold">
                        {toOptionName(sectionOpts, sectionCode)}
                      </Text>
                    </Stack>
                  </Td>
                  <Td borderRight="1px solid #eee">
                    <Stack>
                      <Text>
                        {e.team_home.name}
                        <Text color="red.500" as="span">
                          ★
                        </Text>
                      </Text>
                      <Text>{e.team_away.name}</Text>
                    </Stack>
                  </Td>
                  <Td borderRight="1px solid #eee">
                    <Stack>
                      <HStack spacing="3px">
                        <span>开赛</span>
                        <Switch
                          colorScheme="teal"
                          size="sm"
                          defaultChecked={e.is_active}
                        />
                      </HStack>
                      <HStack spacing="3px">
                        <span>下注</span>
                        <Switch
                          colorScheme="brown"
                          size="sm"
                          defaultChecked={e.is_open_bet}
                        />
                      </HStack>
                      <HStack spacing="3px">
                        <span>自结</span>
                        <Switch
                          colorScheme="blue"
                          size="sm"
                          defaultChecked={e.is_auto_accounting}
                        />
                      </HStack>
                    </Stack>
                  </Td>
                  {playOpts
                    .filter((p) => displayPlays.includes(p.value))
                    .map((p) => (
                      <Td key={p.value} borderRight="1px solid #eee">
                        {getPlayCtrl(p.value, e.odds[p.value])}
                      </Td>
                    ))}
                </Tr>
              </Fragment>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default TableData
