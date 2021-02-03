import { OptionType } from '@/types'
import React, { createContext, useContext, useState } from 'react'

type OptionsProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]
interface ContextProps {
  role: OptionsProps<OptionType[]>
  permission: OptionsProps<OptionType[]>
  country: OptionsProps<OptionType[]>
  sport: OptionsProps<OptionType[]>
  game: OptionsProps<OptionType[]>
  league: OptionsProps<OptionType[]>
  team: OptionsProps<OptionType[]>
}

const OptionsContext = createContext<ContextProps>(null)

const OptionsProvider: React.FC = ({ children }) => {
  const initialState: ContextProps = {
    role: useState([]),
    permission: useState([]),
    country: useState([]),
    sport: useState([]),
    game: useState([]),
    league: useState([]),
    team: useState([]),
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
