import { OptionType } from '@/types'
import { Button } from '@chakra-ui/button'
import { InputProps } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import React from 'react'

function SearchBarButtonRadios<T extends string | number>({
  options = [],
  value,
  onChange,
}: {
  options?: OptionType<T>[]
  onChange?: (value: T) => void
} & InputProps) {
  return (
    <Stack direction="row">
      {options.map((t) => (
        <Button
          key={t.value}
          colorScheme="brown"
          borderRadius="3px"
          bg={t.value === value ? 'brown.500' : 'gray.600'}
          size="sm"
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </Button>
      ))}
    </Stack>
  )
}

export default SearchBarButtonRadios
