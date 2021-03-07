import React, { useEffect } from 'react'
import { HiPlus } from 'react-icons/hi'
import TipIconButton from './TipIconButton'

const CreateButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <TipIconButton
      label="新增"
      icon={<HiPlus />}
      onClick={onClick}
      colorScheme="teal"
    />
  )
}

export default CreateButton
