import Dashboard from '@/components/Dashboard'
import React from 'react'
import { DatePicker } from 'antd'
import { Box } from '@chakra-ui/react'
export default function Home() {
  return (
    <Dashboard>
      <Box
        as={DatePicker}
        w="250px"
        h="40px"
        borderRadius="full"
        bgColor="#eee"
        fontWeight="800"
      />
    </Dashboard>
  )
}
