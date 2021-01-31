import { Collapse, Stack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type SearchBarProps = {
  isOpen: boolean
  children?: ReactNode
}

function SearchBar({ children, isOpen }: SearchBarProps) {
  return (
    <Collapse in={isOpen} animateOpacity>
      <Stack
        as="form"
        bgColor="white"
        borderRadius="md"
        p="15px"
        pb="24px"
        direction={['column', 'row']}
        spacing="12px"
        mb="15px"
      >
        {children}
      </Stack>
    </Collapse>
  )
}

export default SearchBar
