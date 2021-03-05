import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react'
import React, { useEffect } from 'react'

type TipIconButtonProps = {
  label: string
  icon: JSX.Element
}

const TipIconButton: React.FC<
  TipIconButtonProps & Omit<IconButtonProps, 'aria-label'>
> = ({ label, ...rest }) => {
  return (
    <Tooltip label={label}>
      <IconButton
        size="sm"
        fontSize="18px"
        borderRadius="0"
        aria-label={label}
        {...rest}
        onFocus={(e) => e.currentTarget.blur()}
      />
    </Tooltip>
  )
}

export default TipIconButton
