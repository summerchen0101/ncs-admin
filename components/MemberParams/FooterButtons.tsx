import { HStack } from '@chakra-ui/layout'
import { Affix, Button } from 'antd'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

function FooterButtons({ onSubmit }: { onSubmit: () => void }) {
  const router = useRouter()
  return (
    <Affix offsetBottom={0}>
      <HStack
        mx="-15px"
        mb="-15px"
        w="100vw"
        bg="gray.200"
        borderTop="1px solid #fff"
        p="15px"
        justifyContent="start"
      >
        <TipIconButton
          label="返回"
          onClick={() => router.back()}
          icon={<HiOutlineArrowLeft />}
          bgColor="gray.600"
          colorScheme="brand"
        />
        <Button type="primary" onClick={onSubmit}>
          確認送出
        </Button>
      </HStack>
    </Affix>
  )
}

export default FooterButtons
