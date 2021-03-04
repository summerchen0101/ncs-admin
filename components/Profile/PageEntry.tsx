import PageHeader from './PageHeader'
import { useDataContext } from '@/context/DataContext'
import React, { useEffect, useState } from 'react'
import Dashboard from '../Dashboard'
import {
  Box,
  HStack,
  Stack,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Image,
  Center,
} from '@chakra-ui/react'
import { Form } from 'antd'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion'
import { BiLink, BiUser } from 'react-icons/bi'
import MyAccordionItem from '../Home/MyAccordionItem'
import Icon from '@chakra-ui/icon'
import QRCode from 'qrcode'

const PageEntry: React.FC = () => {
  const [qrcode, setQrcode] = useState('')

  const createQRCode = async () => {
    const dataString = await QRCode.toDataURL(
      'http://localhost:3002/p/c0sg3o5nf4q2ai08f490',
    )
    setQrcode(dataString)
  }
  useEffect(() => {
    createQRCode()
  }, [])
  return (
    <Dashboard>
      <PageHeader />
      <Accordion
        defaultIndex={[0, 1]}
        allowMultiple
        maxW="900px"
        overflowX="auto"
      >
        <Stack spacing="20px" direction={['column', 'row']}>
          <AccordionItem flex={1}>
            <h2>
              <AccordionButton
                shadow="sm"
                bg="teal.500"
                color="white"
                borderTopRadius="md"
                _hover={null}
                _focus={null}
              >
                <HStack
                  flex="1"
                  textAlign="left"
                  spacing="3px"
                  fontWeight="500"
                >
                  <Icon as={BiUser} fontSize="20px" />
                  <Text>個人資料</Text>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel py="4" bg="gray.300" borderBottomRadius="md">
              <Form layout="vertical">
                <Form.Item label="帳號">
                  <Input bg="white" disabled defaultValue="ruby" />
                </Form.Item>
                <Form.Item label="暱稱">
                  <Input bg="white" disabled defaultValue="RUBY" />
                </Form.Item>
                <Form.Item label="舊密碼" name="old_pass">
                  <Input type="password" bg="white" />
                </Form.Item>
                <Form.Item label="新密碼" name="pass">
                  <Input type="password" bg="white" />
                </Form.Item>
                <Form.Item label="確認新密碼" name="pass_c">
                  <Input type="password" bg="white" />
                </Form.Item>
                <Form.Item>
                  <Button w="full" colorScheme="teal" mt="15px">
                    密碼修改
                  </Button>
                </Form.Item>
              </Form>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem flex={1}>
            <h2>
              <AccordionButton
                shadow="sm"
                bg="orange.500"
                color="white"
                borderTopRadius="md"
                _hover={null}
                _focus={null}
              >
                <HStack
                  flex="1"
                  textAlign="left"
                  spacing="3px"
                  fontWeight="500"
                >
                  <Icon as={BiLink} fontSize="20px" />
                  <Text>会员推广</Text>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel py="4" bg="gray.300" borderBottomRadius="md">
              <Form layout="vertical">
                <Form.Item label="推廣連結">
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      bg="white"
                      defaultValue="http://localhost:3002/p/c0sg3o5nf4q2ai08f490"
                      disabled
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" colorScheme="orange">
                        COPY
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Form.Item>
                <Form.Item label="推廣代碼">
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      bg="white"
                      disabled
                      defaultValue="c0sg3o5nf4q2ai08f490"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" colorScheme="orange">
                        COPY
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Form.Item>
              </Form>
              <Center mt="30px" mb="10px">
                <Image src={qrcode} w="280px" borderRadius="md" />
              </Center>
            </AccordionPanel>
          </AccordionItem>
        </Stack>
      </Accordion>
    </Dashboard>
  )
}

export default PageEntry
