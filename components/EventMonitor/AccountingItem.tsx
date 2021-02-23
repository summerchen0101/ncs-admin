import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Center, Stack, VStack } from '@chakra-ui/layout'
import { Select } from 'antd'
import React from 'react'

interface AccountingItemProps {
  title: string
}
function AccountingItem({ title }: AccountingItemProps) {
  return (
    <Stack alignItems="stretch" mb="4" direction={['column', 'row']}>
      <Center
        w="100px"
        bg="blue.500"
        color="white"
        fontWeight="bold"
        borderRadius="sm"
      >
        {title}
      </Center>
      <VStack>
        <Input placeholder="主" size="sm" />
        <Input placeholder="客" size="sm" />
      </VStack>
      <VStack flex="1">
        <Box
          as={Select}
          w="full"
          defaultValue={1}
          options={[
            { label: '一般', value: 1 },
            { label: '延賽/取消', value: 2 },
          ]}
        />
        <Button w="full" size="sm" colorScheme="teal" borderRadius="sm">
          結帳
        </Button>
      </VStack>
    </Stack>
  )
}

export default AccountingItem
