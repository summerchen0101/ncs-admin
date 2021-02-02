import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
} from '@chakra-ui/react'

const Form: React.FC = () => {
  const { handleSubmit, errors, register, formState, reset } = useForm()
  const onSubmit = handleSubmit(async (d) => {
    try {
      await Promise.resolve()
      reset()
    } catch (err) {}
  })
  return (
    <Box w="md" p="6" border="1px" borderRadius="lg" borderColor="gray.200">
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">First name</FormLabel>
          <Input
            name="name"
            placeholder="name"
            ref={register({ required: true })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Box d="flex" justifyContent="center" mt={4}>
          <Button
            colorScheme="gray"
            mx="2"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
          <Button
            mx="2"
            colorScheme="brand"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default Form
