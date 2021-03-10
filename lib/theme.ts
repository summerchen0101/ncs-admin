import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      300: '#ab8e59',
      500: '#695f4e',
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
