import { useOptionsContext } from '@/context/OptionsContext'
import useValidator from '@/utils/useValidator'
import { Form, FormInstance, Input, Select, Switch, Col, Row } from 'antd'
import React, { useEffect } from 'react'
export interface AdminUserFormProps {
  id?: number
  acc: string
  pass?: string
  pass_c?: string
  name: string
  role_ids: number[]
  permission_ids: number[]
  is_active: boolean
  is_locked: boolean
}

function FormData({
  data,
  form,
}: {
  data: AdminUserFormProps
  form: FormInstance<AdminUserFormProps>
}) {
  const VD = useValidator()
  const [permissionOpts] = useOptionsContext('permissions')
  const [roleOpts] = useOptionsContext('roles')
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return (
    <Form
      layout="vertical"
      validateTrigger="onBlur"
      form={form}
      initialValues={data}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="管理者帳號"
            name="acc"
            rules={[
              { required: true },
              { pattern: /^\w{4,12}$/, message: '4~12個英數字' },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="真實姓名"
            name="name"
            rules={[{ required: true }, { max: 30 }]}
          >
            <Input />
          </Form.Item>
        </Col>
        {!data.id && (
          <>
            <Col span={12}>
              <Form.Item
                label="密碼"
                name="pass"
                rules={[{ required: true }, VD.userPassword]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="確認密碼"
                name="pass_c"
                rules={[{ required: true }, VD.sameAs('pass')]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </>
        )}

        <Col span={24}>
          <Form.Item label="角色" name="role_ids">
            <Select mode="multiple" options={roleOpts} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="權限" name="permission_ids">
            <Select mode="multiple" options={permissionOpts} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="狀態" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="鎖定" name="is_locked" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormData
