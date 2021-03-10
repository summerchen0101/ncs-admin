import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      200: '#d8bb86',
      300: '#ab8e59',
      500: '#695f4e',
      600: '#544c3e',
      800: '#3a3730',
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
