import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { Menu } from '@/types/api/Menu'
import { Box, HStack, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { Form, FormInstance, Input, InputNumber, Select, Switch } from 'antd'
import React, { useEffect } from 'react'
import * as HiIcons from 'react-icons/hi'
export interface MenuFormProps {
  id?: number
  parent_id?: number
  sort: number
  name: string
  path: string
  icon: string
  permission_ids: number[]
  role_ids: number[]
  is_active: boolean
}

function FormData({
  data,
  form,
}: {
  data: MenuFormProps
  form: FormInstance<MenuFormProps>
}) {
  const [permissionOpts] = useOptionsContext().permission
  const [roleOpts] = useOptionsContext().role
  const { list } = useDataContext<Menu>()

  return (
    <Form layout="vertical" form={form} initialValues={data}>
      <SimpleGrid columns={2} spacing={4}>
        <Form.Item label="上層" name="parent_id">
          <Select
            options={list
              .filter((t) => t.id !== data.id)
              .map((t) => ({ label: t.name, value: t.id }))}
            placeholder="請選擇上層"
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="名稱"
          name="name"
          rules={[{ required: true }, { max: 30 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="路徑"
          name="path"
          rules={[{ required: true }, { max: 30 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="圖示" name="icon" rules={[{ max: 30 }]}>
          <Select
            showSearch
            options={Object.entries(HiIcons).map(([name, Comp]) => ({
              label: (
                <HStack>
                  <Icon as={Comp} fontSize="25px" />
                  <Text>{name}</Text>
                </HStack>
              ),
              value: name,
            }))}
          />
        </Form.Item>
        <Form.Item label="權限" name="permission_ids">
          <Select
            mode="multiple"
            options={permissionOpts}
            filterOption={(input, option) =>
              (option.label as string)
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          />
        </Form.Item>
        <Form.Item label="角色" name="role_ids">
          <Select mode="multiple" options={roleOpts} />
        </Form.Item>
        <Form.Item label="排序" name="sort">
          <Box as={InputNumber} w="full" />
        </Form.Item>
        <Form.Item label="狀態" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </SimpleGrid>
    </Form>
  )
}

export default FormData
