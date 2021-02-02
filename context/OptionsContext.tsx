import { OptionType } from '@/types'
import React, { createContext, useContext, useState } from 'react'

type OptionsProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]
interface ContextProps {
  roles: OptionsProps<OptionType[]>
  permissions: OptionsProps<OptionType[]>
}

const OptionsContext = createContext<ContextProps>(null)

const OptionsProvider: React.FC = ({ children }) => {
  const initialState: ContextProps = {
    roles: useState([]),
    permissions: useState([]),
  }
  return (
    <OptionsContext.Provider value={initialState}>
      {children}
    </OptionsContext.Provider>
  )
}

export default OptionsProvider

export const useOptionsContext = (optionName: keyof ContextProps) => {
  const state = useContext(OptionsContext)
  return state[optionName]
}
