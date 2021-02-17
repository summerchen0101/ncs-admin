import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      500: '#1890ff',
    },
  },
  components: {
    Input: {
      baseStyle: {
        bgColor: 'gray.100',
      },
    },
  },
})

export default theme
