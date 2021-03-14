import { playOpts, sectionOpts } from '@/lib/options'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import useTransfer from '@/utils/useTransfer'
import {
  Box,
  Checkbox,
  CheckboxGroup,
  HStack,
  Icon,
  Radio,
  RadioGroup,
  SimpleGrid,
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
import { Input, InputNumber, Popover, Select } from 'antd'
import moment from 'moment'
import React, { Fragment, useEffect } from 'react'
import { BiInfoCircle } from 'react-icons/bi'
import { HiInformationCircle } from 'react-icons/hi'
import MyCheckBox from '../MyCheckBox'
import ControlItems from './ControlItems'

function TableData({ list }: { list: Marquee[] }) {
  const { toDateTime } = useTransfer()
  const { setActive, fetchById, doDelete } = useMarqueeService()
  const { toOptionName, toDate } = useTransfer()
  return (
    <Box>
      <Stack
        direction={['column', 'row']}
        alignItems="center"
        mb="3"
        pos="fixed"
        top="0"
        w="100vw"
        zIndex="9"
        bg="white"
        py="2"
        px="3"
        shadow="md"
      >
        <Text fontSize="16px" fontWeight="bold" mx="2">
          歐足
        </Text>
        <Box as={Select} options={sectionOpts} w="150px" placeholder="場次" />
        <span>開賽</span>
        <Switch colorScheme="teal" defaultChecked size="sm" />
        <span>下注</span>
        <Switch colorScheme="brown" defaultChecked size="sm" />
        <span>自結</span>
        <Switch colorScheme="blue" defaultChecked size="sm" />
        <Spacer />
        <span>顯示：</span>
        <CheckboxGroup
          colorScheme="blue"
          defaultValue={playOpts.map((t) => t.value)}
        >
          <HStack>
            {playOpts.map((t, i) => (
              <Checkbox key={i} value={t.value} size="sm">
                {t.label}
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>
      </Stack>
      <Box
        w="100vw"
        h="100vh"
        overflow="auto"
        border="1px solid #eee"
        pt="47px"
      >
        <Table size="sm" variant="striped" whiteSpace="nowrap">
          <Thead>
            <Tr bg="gray.500">
              <Th color="white" py="2">
                賽控
              </Th>
              <Th color="white" py="2">
                賽編/開賽時間/場次
              </Th>
              <Th color="white" py="2">
                隊伍資訊
              </Th>
              {playOpts.map((t) => (
                <Th key={t.value} color="white">
                  {t.label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Array(5)
              .fill('')
              .map((e, e_i) => (
                <Fragment key={e_i}>
                  <Tr>
                    <Td colSpan={3}>
                      <HStack>
                        <Text color="orange.500" fontWeight="bold">
                          A51222
                        </Text>
                        <Text fontWeight="bold">超級可愛無敵大聯盟</Text>
                        <Text>{moment().format('MM-DD HH:mm')}</Text>
                      </HStack>
                    </Td>
                    {playOpts.map((t) => (
                      <Td key={t.value}>
                        <HStack>
                          <MyCheckBox size="sm">平</MyCheckBox>
                          <InputNumber
                            step={0.01}
                            size="small"
                            defaultValue={1.86}
                            placeholder="平水值"
                          />
                          <span>開賽</span>
                          <Switch colorScheme="teal" defaultChecked size="sm" />
                          <span>下注</span>
                          <Switch
                            colorScheme="brown"
                            defaultChecked
                            size="sm"
                          />
                          <Spacer />
                          <Popover
                            content={
                              <Stack spacing="sm">
                                <Text>實貨量：10,000</Text>
                                <Text>投注數：100</Text>
                              </Stack>
                            }
                          >
                            {/* <Icon as={HiInformationCircle} fontSize="17px" /> */}
                            <Text as="a" color="brown.700" fontWeight="600">
                              1.0
                            </Text>
                          </Popover>
                        </HStack>
                      </Td>
                    ))}
                  </Tr>
                  <Tr>
                    <Td borderRight="1px solid #eee">
                      <Stack>
                        <Text fontWeight="bold">全場</Text>
                      </Stack>
                    </Td>
                    <Td borderRight="1px solid #eee">
                      <Stack>
                        <Text>
                          長頸鹿衝鋒隊
                          <Text color="red.500" as="span">
                            ★
                          </Text>
                        </Text>
                        <Text>可愛河馬隊</Text>
                      </Stack>
                    </Td>
                    <Td borderRight="1px solid #eee">
                      <Stack>
                        <HStack>
                          <span>開賽</span>
                          <Switch colorScheme="teal" defaultChecked size="sm" />
                        </HStack>
                        <HStack>
                          <span>下注</span>
                          <Switch
                            colorScheme="brown"
                            defaultChecked
                            size="sm"
                          />
                        </HStack>
                        <HStack>
                          <span>自結</span>
                          <Switch colorScheme="blue" defaultChecked size="sm" />
                        </HStack>
                      </Stack>
                    </Td>
                    <Td borderRight="1px solid #eee">
                      <SimpleGrid spacing={3} columns={2}>
                        <Stack>
                          {Array(5)
                            .fill('')
                            .map((t, i) => (
                              <HStack key={i} spacing="2" whiteSpace="nowrap">
                                <Text>1-{i}</Text>
                                <ControlItems />
                              </HStack>
                            ))}
                        </Stack>
                        <Stack>
                          {Array(5)
                            .fill('')
                            .map((t, i) => (
                              <HStack key={i} spacing="2" whiteSpace="nowrap">
                                <Text>{i}-1</Text>
                                <ControlItems />
                              </HStack>
                            ))}
                        </Stack>
                      </SimpleGrid>
                    </Td>
                    <Td borderRight="1px solid #eee">
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
                    </Td>
                    <Td borderRight="1px solid #eee">
                      <Stack>
                        <RadioGroup defaultValue="1">
                          <HStack spacing="2">
                            <Radio value="1" />
                            <Text>主</Text>
                            <ControlItems isHandicap />
                          </HStack>
                          <HStack spacing="2">
                            <Radio value="2" />
                            <Text>客</Text>
                            <ControlItems />
                          </HStack>
                        </RadioGroup>
                      </Stack>
                    </Td>
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
