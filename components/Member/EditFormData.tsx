import { AccountingType, MemberType, RestoreType } from '@/lib/enums'
import {
  accountingTypeOpts,
  memberTypeOpts,
  restoreTypeOpts,
} from '@/lib/options'
import { BetSetting, Member } from '@/types/api/Member'
import { SimpleGrid } from '@chakra-ui/react'
import { Form, FormInstance, Input, Select } from 'antd'
import React, { useEffect } from 'react'

export interface EditMemberFormProps {
  id?: number
  name: string
  acc: string
  member_type: MemberType
  accounting_type: AccountingType
  restore_type: RestoreType
  note: string
}

function EditFormData({
  data,
  form,
}: {
  data: EditMemberFormProps
  form: FormInstance<EditMemberFormProps>
}) {
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])

  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid spacingX="20px" columns={[1, 2]}>
        <Form.Item label="會員種類" name="member_type">
          <Select options={memberTypeOpts} disabled />
        </Form.Item>
        <Form.Item label="帳務類型" name="accounting_type">
          <Select options={accountingTypeOpts} disabled />
        </Form.Item>
        <Form.Item label="帳號" name="acc">
          <Input disabled />
        </Form.Item>
        <Form.Item label="暱稱" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="回復設定"
          name="restore_type"
          rules={[{ required: true }]}
        >
          <Select options={restoreTypeOpts} />
        </Form.Item>

        <Form.Item label="會員備註" name="note">
          <Input />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default EditFormData
