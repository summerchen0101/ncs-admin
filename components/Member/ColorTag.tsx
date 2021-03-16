import { MemberTagOption } from '@/types/options'
import { Circle, SquareProps } from '@chakra-ui/layout'
import { Tooltip } from 'antd'
import React, { useEffect } from 'react'

function ColorTag({ tag, ...props }: { tag: MemberTagOption } & SquareProps) {
  const { color, name } = tag
  return (
    <Tooltip title={name} color={color}>
      <Circle
        bg={color}
        color="white"
        size={['25px', '20px']}
        fontSize={['15px', '12px']}
        fontWeight="600"
        cursor="default"
        {...props}
      >
        {name.substr(0, 1)}
      </Circle>
    </Tooltip>
  )
}

export default ColorTag
