import { OptionBasic } from '@/types'
import { Select } from '@chakra-ui/react'
import React from 'react'

type BasicSelectProps = {
  options: OptionBasic[]
}
function BasicSelect({ options, ...props }: BasicSelectProps, ref) {
  return (
    <Select {...props} ref={ref}>
      {options.map((t, i) => (
        <option key={i} value={t.id}>
          {t.name}
        </option>
      ))}
    </Select>
  )
}

export default React.forwardRef(BasicSelect)
