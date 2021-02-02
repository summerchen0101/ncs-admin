import React from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import TipIconButton from './TipIconButton'

const CreateButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <TipIconButton
      label="新增"
      icon={<HiOutlinePlus />}
      onClick={onClick}
      colorScheme="brand"
    />
  )
}

export default CreateButton
