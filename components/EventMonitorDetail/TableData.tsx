import { playOpts, sectionOpts } from '@/lib/options'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import useTransfer from '@/utils/useTransfer'
import {
  Box,
  Checkbox,
  CheckboxGroup,
  HStack,
  SimpleGrid,
  Stack,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { InputNumber, Select } from 'antd'
import moment from 'moment'
import React from 'react'
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
        <Text fontSize="20px" fontWeight="bold" mx="2">
          ★ 歐足
        </Text>
        <Box as={Select} options={sectionOpts} w="150px" placeholder="場次" />
        <CheckboxGroup
          colorScheme="blue"
          defaultValue={playOpts.map((t) => t.value)}
        >
          <HStack>
            {playOpts.map((t, i) => (
              <Checkbox key={i} value={t.value}>
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
          <Tbody>
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
              <Th color="white">反波膽</Th>
              <Th color="white" py="2">
                大小
              </Th>
              <Th color="white" py="2">
                單雙
              </Th>
              <Th color="white" py="2">
                独赢
              </Th>
              <Th color="white" py="2">
                和局
              </Th>
            </Tr>
            {Array(5)
              .fill('')
              .map((e, e_i) => (
                <Tr key={e_i}>
                  <Td>
                    <VStack alignItems="start">
                      <HStack>
                        <span>開賽</span>
                        <Switch colorScheme="teal" defaultChecked />
                      </HStack>
                      <HStack>
                        <span>自控</span>
                        <Switch colorScheme="orange" defaultChecked />
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems="start">
                      <Text color="orange.500" fontWeight="bold">
                        AN12351222
                      </Text>
                      <Text>{toDateTime(moment().unix())}</Text>
                      <Text fontWeight="bold">全場</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems="start">
                      <Text fontWeight="bold">123大聯盟</Text>
                      <Text>可愛大象隊(主)</Text>
                      <Text>可愛河馬隊</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <SimpleGrid spacing={3} columns={2}>
                      <VStack alignItems="start">
                        {Array(5)
                          .fill('')
                          .map((t, i) => (
                            <HStack key={i} spacing="2" whiteSpace="nowrap">
                              <Text>1-{i}</Text>
                              <ControlItems />
                            </HStack>
                          ))}
                      </VStack>
                      <VStack alignItems="start">
                        {Array(5)
                          .fill('')
                          .map((t, i) => (
                            <HStack key={i} spacing="2" whiteSpace="nowrap">
                              <Text>{i}-1</Text>
                              <ControlItems />
                            </HStack>
                          ))}
                      </VStack>
                    </SimpleGrid>
                  </Td>
                  <Td>
                    <VStack alignItems="start">
                      <HStack spacing="2">
                        <Text>大</Text>
                        <ControlItems />
                      </HStack>
                      <HStack spacing="2">
                        <Text>小</Text>
                        <ControlItems />
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems="start">
                      <HStack spacing="2">
                        <Text>單</Text>
                        <ControlItems />
                      </HStack>
                      <HStack spacing="2">
                        <Text>雙</Text>
                        <ControlItems />
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems="start">
                      <HStack spacing="2">
                        <Text>主</Text>
                        <ControlItems />
                      </HStack>
                      <HStack spacing="2">
                        <Text>客</Text>
                        <ControlItems />
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack spacing="2">
                      <ControlItems />
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default TableData
