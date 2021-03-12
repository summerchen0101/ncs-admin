import { MemberTagOption } from '@/types/options'
import { Select, Tag } from 'antd'
import React from 'react'

function ColorTagSelector({ options }: { options: MemberTagOption[] }) {
  const tagRender = function (props) {
    const { label, value, closable, onClose } = props
    const color = options.find((t) => t.id === value)?.color
    return (
      <Tag
        color={color}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, fontSize: '14px' }}
      >
        {label}
      </Tag>
    )
  }

  return (
    <Select
      mode="multiple"
      options={options?.map((t) => ({
        label: t.name,
        value: t.id,
      }))}
      tagRender={tagRender}
    />
  )
}

export default ColorTagSelector
