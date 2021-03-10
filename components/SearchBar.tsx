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
        bgColor="brand.900"
        color="white"
        p="15px"
        direction={['column', 'row']}
        spacing="12px"
        mb="15px"
        className="searchBar"
        borderRadius="4px"
      >
        {children}
      </Stack>
    </Collapse>
  )
}

export default SearchBar
