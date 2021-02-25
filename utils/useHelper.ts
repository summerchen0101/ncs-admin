import { useToast } from '@chakra-ui/react'

const useHelper = () => {
  const toast = useToast()
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ status: 'success', title: '已複製至剪貼簿' })
  }
  return { copyToClipboard }
}

export default useHelper
