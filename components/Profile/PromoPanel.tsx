import { useDataContext } from '@/context/DataContext'
import { Member } from '@/types/api/Member'
import useHelper from '@/utils/useHelper'
import { AccordionItem, AccordionPanel } from '@chakra-ui/accordion'
import {
  Button,
  Center,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { Form } from 'antd'
import QRCode from 'qrcode'
import React, { useEffect, useMemo, useState } from 'react'
import { BiLink } from 'react-icons/bi'
import PanelHeader from './PanelHeader'

const PromoPanel = function () {
  const [qrcode, setQrcode] = useState('')
  const { copyToClipboard } = useHelper()
  const { viewData } = useDataContext<Member>()

  const promoLink = useMemo(() => {
    if (viewData && process.browser) {
      return `${location.origin}/p/${viewData?.promo_code}`
    }
    return ''
  }, [viewData])

  const createQRCode = async (str: string) => {
    const dataString = await QRCode.toDataURL(str)
    setQrcode(dataString)
  }

  useEffect(() => {
    promoLink && createQRCode(promoLink)
  }, [promoLink])

  return (
    <AccordionItem flex={1}>
      <PanelHeader title="會員推廣" bg="orange.500" icon={BiLink} />
      <AccordionPanel py="4" bg="gray.300" borderBottomRadius="md">
        <Form layout="vertical">
          <Form.Item label="推廣連結">
            <InputGroup size="md">
              <Input pr="4.5rem" bg="white" defaultValue={promoLink} disabled />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  colorScheme="orange"
                  onClick={() => copyToClipboard(promoLink)}
                >
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
                defaultValue={viewData?.promo_code}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  colorScheme="orange"
                  onClick={() => copyToClipboard(viewData?.promo_code)}
                >
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
  )
}

export default PromoPanel
