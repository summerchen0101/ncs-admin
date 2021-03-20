import useHelper from '@/utils/useHelper'
import { UploadOutlined } from '@ant-design/icons'
import { Box, Image, Stack } from '@chakra-ui/react'
import { Button, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const ImageUpload: React.FC<{
  onChange?: (dataUrl: string) => void
  value?: string
}> = ({ onChange, value }) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)
  const { getBase64 } = useHelper()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const file = e.target.files[0]
    const imageUrl = await getBase64(file)
    setImageUrl(imageUrl)
    onChange && onChange(imageUrl)
    setLoading(false)
  }

  useEffect(() => {
    setImageUrl(value)
  }, [value])

  return (
    <Stack direction={['column', 'row']}>
      <input hidden ref={fileInput} type="file" onChange={handleChange} />
      <Box>
        <Button
          icon={<UploadOutlined />}
          onClick={() => fileInput.current.click()}
        >
          上傳圖片 {loading && 'loading...'}
        </Button>
      </Box>
      <Box>
        <Image src={imageUrl} />
      </Box>
    </Stack>
  )
}

export default ImageUpload
