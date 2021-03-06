import { Collapse, Stack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { Form, FormInstance, FormProps } from 'antd'

type SearchBarProps<T> = {
  isOpen: boolean
  children?: ReactNode
  form: FormInstance<T>
}

function SearchBar<T>({
  children,
  isOpen,
  form,
}: SearchBarProps<T> & FormProps<T>) {
  return (
    <Collapse in={isOpen} animateOpacity>
      <Stack
        as={Form}
        form={form}
        align=""
        bgColor="yellow.800"
        color="white"
        p="15px"
        direction={['column', 'row']}
        spacing="12px"
        mb="15px"
        className="searchBar"
      >
        {children}
      </Stack>
    </Collapse>
  )
}

export default SearchBar
