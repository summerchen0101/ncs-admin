import { useOptionsContext } from '@/context/OptionsContext'
import { Form, FormInstance } from 'antd'
import React, { useEffect } from 'react'
import ColorTagSelector from '../ColorTagSelector'

export interface TagFormProps {
  id?: number
  tag_ids: number[]
}

function TagFormData({
  data,
  form,
}: {
  data: TagFormProps
  form: FormInstance<TagFormProps>
}) {
  const [tagOpts] = useOptionsContext().tag

  useEffect(() => {
    form.setFieldsValue(data)
  }, [])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="标籤" name="tag_ids">
        <ColorTagSelector options={tagOpts} />
      </Form.Item>
    </Form>
  )
}

export default TagFormData
