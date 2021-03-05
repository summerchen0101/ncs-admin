import { useDataContext } from '@/context/DataContext'
import { playOpts, sectionOpts } from '@/lib/options'
import { Marquee } from '@/types/api/Marquee'
import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox'
import { Box, Divider, HStack, Stack, Text } from '@chakra-ui/layout'
import { Select } from 'antd'
import React, { useEffect } from 'react'
import TableData from './TableData'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Marquee>()

  return <TableData list={list} />
}

export default PageEntry
