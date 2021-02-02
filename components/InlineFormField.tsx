import { Box, BoxProps, ChakraComponent } from '@chakra-ui/react'
import { Form, FormItemProps } from 'antd'
import React, { ReactNode } from 'react'

type FormFieldProps<T> = {
  children?: ReactNode
}

const InlineFormField = function <T>({
  children,
  ...rest
}: FormFieldProps<T> & FormItemProps & BoxProps) {
  return (
    <Box as={Form.Item} mb="0" {...rest} w={['auto', '230px']}>
      {children}
    </Box>
  )
}

export default InlineFormField
