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
  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid spacingX="20px" columns={[1, 2]}>
        <Form.Item label="会员种类" name="member_type">
          <Select options={memberTypeOpts} disabled />
        </Form.Item>
        <Form.Item label="帐务类型" name="accounting_type">
          <Select options={accountingTypeOpts} disabled />
        </Form.Item>
        <Form.Item label="帐号" name="acc">
          <Input disabled />
        </Form.Item>
        <Form.Item label="暱称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="回复设置"
          name="restore_type"
          rules={[{ required: true }]}
        >
          <Select options={restoreTypeOpts} />
        </Form.Item>

        <Form.Item label="会员备注" name="note">
          <Input />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default EditFormData
