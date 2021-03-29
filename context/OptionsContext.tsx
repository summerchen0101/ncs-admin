import { OptionType } from '@/types'
import { MemberTagOption } from '@/types/options'
import React, { createContext, useContext, useState } from 'react'

type OptionsProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]
interface ContextProps {
  role: OptionsProps<OptionType[]>
  permission: OptionsProps<OptionType[]>
  menu: OptionsProps<OptionType[]>
  country: OptionsProps<OptionType[]>
  sport: OptionsProps<OptionType[]>
  game: OptionsProps<OptionType[]>
  leagueGroup: OptionsProps<OptionType[]>
  league: OptionsProps<OptionType[]>
  team: OptionsProps<OptionType[]>
  faqCategory: OptionsProps<OptionType[]>
  tag: OptionsProps<MemberTagOption[]>
  affiliateLevel: OptionsProps<OptionType[]>
}

const OptionsContext = createContext<ContextProps>(null)

const OptionsProvider: React.FC = ({ children }) => {
  const initialState: ContextProps = {
    role: useState([]),
    permission: useState([]),
    menu: useState([]),
    country: useState([]),
    sport: useState([]),
    game: useState([]),
    leagueGroup: useState([]),
    league: useState([]),
    team: useState([]),
    faqCategory: useState([]),
    tag: useState([]),
    affiliateLevel: useState([]),
  }
  return (
    <OptionsContext.Provider value={initialState}>
      {children}
    </OptionsContext.Provider>
  )
}

export default OptionsProvider

export const useOptionsContext = () => useContext(OptionsContext)
export const useMemberTagOpts = () => useContext(OptionsContext).tag
