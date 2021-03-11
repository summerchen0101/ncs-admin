import { InputProps } from '@chakra-ui/input'
import React, { forwardRef, useState } from 'react'
import {
  CirclePicker,
  ColorResult,
  CompactPicker,
  SketchPicker,
} from 'react-color'

function ColorPicker(
  { value, onChange }: { value?: string; onChange?: (hex: string) => void },
  ref,
) {
  return (
    <CirclePicker
      ref={ref}
      color={value}
      onChangeComplete={(c) => onChange(c?.hex)}
    />
  )
}

export default forwardRef(ColorPicker)
