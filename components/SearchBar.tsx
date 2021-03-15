import { Collapse, Stack, StackProps } from '@chakra-ui/react'
import { Form, FormInstance, FormProps } from 'antd'
import React, { ReactNode } from 'react'

type SearchBarProps<T> = {
  isOpen: boolean
  children?: ReactNode
  form: FormInstance<T>
}

function SearchBar<T>({
  children,
  isOpen,
  form,
  ...props
}: SearchBarProps<T> & StackProps) {
  return (
    <Collapse in={isOpen} animateOpacity>
      <Stack
        as={Form}
        form={form}
        bgColor="gray.700"
        color="white"
        p="15px"
        pb={['15px', '5px']}
        direction={['column', 'row']}
        spacing="12px"
        mb="15px"
        className="searchBar"
        borderRadius="4px"
        // wrap={['nowrap', 'wrap']}
        {...props}
      >
        {children}
      </Stack>
    </Collapse>
  )
}

export default SearchBar
