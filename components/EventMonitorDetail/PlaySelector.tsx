import { Play } from '@/lib/enums'
import { playOpts } from '@/lib/options'
import useStorage from '@/utils/useStorage'
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
} from '@chakra-ui/checkbox'
import { HStack } from '@chakra-ui/layout'
import React, { useState } from 'react'

function PlaySelector(props: CheckboxGroupProps) {
  return (
    <>
      <span>显示：</span>
      <CheckboxGroup colorScheme="blue" {...props}>
        <HStack>
          {playOpts.map((t, i) => (
            <Checkbox key={i} value={t.value} size="sm">
              {t.label}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
    </>
  )
}

export default PlaySelector
