import { useToast } from '@chakra-ui/react'
import moment from 'moment'
import { useRef } from 'react'

const useHelper = () => {
  const toast = useToast()
  const copyToClipboard = async (text) => {
    const input = document.body.appendChild(document.createElement('input'))
    input.value = text
    input.focus()
    input.select()
    document.execCommand('copy')
    input.parentNode.removeChild(input)
  }
  return { copyToClipboard }
}

export default useHelper
