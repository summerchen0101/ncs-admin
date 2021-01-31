import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import React from 'react'
import { DeepMap, FieldError } from 'react-hook-form'

type FormFieldProps<T> = {
  label: string
  code: string
  errors?: DeepMap<T, FieldError>
  children?: JSX.Element
}

const FormField = function <T>({
  label,
  code,
  errors,
  children,
  ...rest
}: FormFieldProps<T> & FormControlProps) {
  return (
    <FormControl id={code} isInvalid={!!errors?.[code]} {...rest}>
      <FormLabel htmlFor={code} color="gray.600">
        {label}
      </FormLabel>
      {children}
      {errors && <FormErrorMessage>{errors?.[code]?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export default FormField
