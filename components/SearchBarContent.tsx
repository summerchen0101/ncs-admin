import { Stack } from '@chakra-ui/layout'
import React, { ReactNode } from 'react'

function SearchBarContent({ children }: { children: ReactNode }) {
  return (
    <Stack direction={['column', 'row']} wrap={['nowrap', 'wrap']}>
      {children}
    </Stack>
  )
}

export default SearchBarContent
