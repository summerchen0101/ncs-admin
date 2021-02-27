import { PlatformType } from '@/lib/enums'
import { countryOpts, platformTypeOpts } from '@/lib/options'
import { Form, FormInstance, Input, Radio, Select, Switch } from 'antd'
import React, { useEffect } from 'react'

export interface CountryBlockFormProps {
  id?: number
  platform_type: PlatformType
  note: string
  is_active: boolean
  code: string
}

function FormData({
  data,
  form,
}: {
  data: CountryBlockFormProps
  form: FormInstance<CountryBlockFormProps>
}) {
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <Form.Item label="國別" name="code" rules={[{ required: true }]}>
        <Select options={countryOpts} showSearch optionFilterProp="label" />
      </Form.Item>
      <Form.Item
        label="端口設置"
        name="platform_type"
        rules={[{ required: true }]}
      >
        <Radio.Group options={platformTypeOpts} />
      </Form.Item>
      <Form.Item label="備註" name="note" rules={[{ max: 30 }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="狀態" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default FormData
