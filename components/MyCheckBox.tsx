import { Checkbox, CheckboxProps } from '@chakra-ui/checkbox'
import React from 'react'

function MyCheckBox(props: CheckboxProps) {
  return (
    <Checkbox
      colorScheme="brand"
      size="lg"
      // bg="gray.300"
      borderColor="gray.300"
      {...props}
    />
  )
}

export default MyCheckBox
