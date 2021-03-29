import { InputNumber, InputNumberProps } from 'antd'
import React from 'react'

function CurrencyInputNumber(props: InputNumberProps) {
  return (
    <InputNumber
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => +value.replace(/\$\s?|(,*)/g, '')}
      {...props}
    />
  )
}

export default CurrencyInputNumber
