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
    <Box
      as={Form.Item}
      mb={[0, '10px']}
      w={['auto', '200px']}
      {...rest}
      d="inline-flex"
    >
      {children}
    </Box>
  )
}

export default InlineFormField
