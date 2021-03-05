import { OptionType } from '@/types'
import { Select } from '@chakra-ui/react'
import React, { useEffect } from 'react'

type BasicSelectProps = {
  options: OptionType[]
}
function BasicSelect({ options, ...props }: BasicSelectProps, ref) {
  return (
    <Select {...props} ref={ref}>
      {options.map((t, i) => (
        <option key={i} value={t.value}>
          {t.label}
        </option>
      ))}
    </Select>
  )
}

export default React.forwardRef(BasicSelect)
