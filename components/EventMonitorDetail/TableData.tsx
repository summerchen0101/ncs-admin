import { Section } from '@/lib/enums'
import { playOpts, sectionOpts } from '@/lib/options'
import { Marquee } from '@/types/api/Marquee'
import {
  Box,
  Checkbox,
  CheckboxGroup,
  HStack,
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
import { InputNumber, Popover, Select } from 'antd'
import moment from 'moment'
import React, { Fragment } from 'react'
import MyCheckBox from '../MyCheckBox'
import ControlItems from './ControlItems'

function TableData({ list }: { list: Marquee[] }) {
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
        <Box
          as={Select}
          options={sectionOpts}
          w="150px"
          placeholder="场次"
          mb="2"
          defaultValue={Section.Full}
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
          <span>显示：</span>
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
                        <Text fontWeight="bold">超级可爱无敌大联盟</Text>
                        <Text>{moment().format('MM-DD HH:mm')}</Text>
                      </HStack>
                    </Td>
                    {playOpts.map((t) => (
                      <Td key={t.value}>
                        <HStack>
                          <MyCheckBox defaultChecked size="sm">
                            平
                          </MyCheckBox>
                          <InputNumber
                            step={0.01}
                            size="small"
                            defaultValue={1.86}
                            placeholder="平水值"
                          />
                          <HStack spacing="3px">
                            <span>开赛</span>
                            <Switch
                              colorScheme="teal"
                              defaultChecked
                              size="sm"
                            />
                          </HStack>
                          <HStack spacing="3px">
                            <span>下注</span>
                            <Switch
                              colorScheme="brown"
                              defaultChecked
                              size="sm"
                            />
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
                        <Text fontWeight="bold">全场</Text>
                      </Stack>
                    </Td>
                    <Td borderRight="1px solid #eee">
                      <Stack>
                        <Text>
                          长颈鹿冲锋队
                          <Text color="red.500" as="span">
                            ★
                          </Text>
                        </Text>
                        <Text>可爱河马队</Text>
                      </Stack>
                    </Td>
                    <Td borderRight="1px solid #eee">
                      <Stack>
                        <HStack spacing="3px">
                          <span>开赛</span>
                          <Switch colorScheme="teal" defaultChecked size="sm" />
                        </HStack>
                        <HStack spacing="3px">
                          <span>下注</span>
                          <Switch
                            colorScheme="brown"
                            defaultChecked
                            size="sm"
                          />
                        </HStack>
                        <HStack spacing="3px">
                          <span>自结</span>
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
                      <RadioGroup defaultValue="1">
                        <Stack>
                          <HStack spacing="2">
                            <Radio value="1" />
                            <Text>主</Text>
                            <ControlItems isHandicap />
                          </HStack>
                          <HStack spacing="2">
                            <Radio value="2" />
                            <Text>客</Text>
                            <ControlItems isHandicap />
                          </HStack>
                        </Stack>
                      </RadioGroup>
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
