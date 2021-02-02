import { OptionBasic, OptionType } from '@/types'
import useCheckList from '@/utils/useCheckList'
import { Box, Checkbox, SelectProps, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type MultiSelectProps = {
  onChange?: (value: number[]) => void
  value?: number[]
  options?: OptionBasic[]
  inValid?: boolean
}

function MultiSelect({ onChange, options, inValid, value }: MultiSelectProps) {
  const {
    checkedAll,
    unCheckedAll,
    checked,
    addChecked,
    subChecked,
    setChecked,
  } = useCheckList(options)
  const isIndeterminate = checked.length > 0 && checked.length < options.length
  const isCheckedAll = checked.length > 0 && checked.length === options.length

  useEffect(() => {
    onChange(options.filter((t, i) => checked.includes(i)).map((t) => t.id))
  }, [checked])

  useEffect(() => {
    setChecked(value.map((id) => options.findIndex((t) => t.id === id)))
  }, [])

  return (
    <Box
      border="1px"
      borderColor={inValid ? '#E53E3E' : '#E2E8F0'}
      shadow={inValid && '0 0 0 1px #e53e3e'}
      borderRadius="md"
      bgColor="gray.100"
      p="15px"
      maxH="300px"
      overflowY="auto"
    >
      <Checkbox
        isChecked={isCheckedAll}
        colorScheme="teal"
        borderColor="#c3ccda"
        isIndeterminate={isIndeterminate}
        onChange={(e) => (e.target.checked ? checkedAll() : unCheckedAll())}
      >
        全選
      </Checkbox>
      <Stack pl={6} mt={1} spacing={1}>
        {options.map((t, i) => (
          <Checkbox
            key={i}
            colorScheme="teal"
            isChecked={checked.includes(i)}
            onChange={(e) => (e.target.checked ? addChecked(i) : subChecked(i))}
          >
            {t.name}
          </Checkbox>
        ))}
      </Stack>
    </Box>
  )
}

export default MultiSelect
