import {
  Box,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import { DeepMap, FieldError } from 'react-hook-form'

type FormFieldProps<T> = {
  label: string
  code: string
  errors?: DeepMap<T, FieldError>
  children?: JSX.Element
}

const InlineFormField = function <T>({
  label,
  code,
  errors,
  children,
  ...rest
}: FormFieldProps<T> & FormControlProps) {
  return (
    <FormControl
      id={code}
      isInvalid={!!errors?.[code]}
      {...rest}
      as={Stack}
      direction={['column', 'row']}
      alignItems={{ md: 'center' }}
    >
      <FormLabel htmlFor={code} color="gray.600" whiteSpace="nowrap" m="0">
        {label}
      </FormLabel>
      <Box>
        {children}
        {errors && (
          <FormErrorMessage>{errors?.[code]?.message}</FormErrorMessage>
        )}
      </Box>
    </FormControl>
  )
}

export default InlineFormField
