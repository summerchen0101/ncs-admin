import { MemberType, Section } from '@/lib/enums'
import { AgentReportSummary } from '@/types/api/AgentReport'
import { BetRatio } from '@/types/api/BetRatio'
import { BetRecordSummary } from '@/types/api/BetRecord'
import { Dashboard } from '@/types/api/Dashboard'
import { BetSetting, ParentTreeItem } from '@/types/api/Member'
import { RechargeRecSummary } from '@/types/api/RechargeRec'
import { WalletRecSummary } from '@/types/api/WalletRec'
import { WithdrawRecSummary } from '@/types/api/WithdrawRec'
import React, { createContext, useContext, useState } from 'react'

type ContextState<T> = {
  list: T[]
  setList: React.Dispatch<React.SetStateAction<T[]>>
  viewData: T
  setViewData: React.Dispatch<React.SetStateAction<T>>
  viewId: number
  setViewId: React.Dispatch<React.SetStateAction<number>>
  betSettings: BetSetting[]
  setBetSettings: React.Dispatch<React.SetStateAction<BetSetting[]>>
  parentBetSettings: BetSetting[]
  setParentBetSettings: React.Dispatch<React.SetStateAction<BetSetting[]>>
  betSettingMemberType: MemberType
  setBetSettingMemberType: React.Dispatch<React.SetStateAction<MemberType>>
  betRatios: BetRatio[]
  setBetRatios: React.Dispatch<React.SetStateAction<BetRatio[]>>
  accountingSection: Section
  setAccountingSection: React.Dispatch<React.SetStateAction<Section>>
  dashboardInfo: Dashboard
  setDashboardInfo: React.Dispatch<React.SetStateAction<Dashboard>>
  betSummary: BetRecordSummary
  setBetSummary: React.Dispatch<React.SetStateAction<BetRecordSummary>>
  rechargeRecSummary: RechargeRecSummary[]
  setRechargeRecSummary: React.Dispatch<
    React.SetStateAction<RechargeRecSummary[]>
  >
  walletRecSummary: WalletRecSummary[]
  setWalletRecSummary: React.Dispatch<React.SetStateAction<WalletRecSummary[]>>
  parentTree: ParentTreeItem[]
  setParentTree: React.Dispatch<React.SetStateAction<ParentTreeItem[]>>

  agentReportSummary: AgentReportSummary
  setAgentReportSummary: React.Dispatch<
    React.SetStateAction<AgentReportSummary>
  >
  withdrawSummary: WithdrawRecSummary
  setWithdrawSummary: React.Dispatch<React.SetStateAction<WithdrawRecSummary>>
}

const DataContext = createContext<ContextState<any>>(null)

const DataProvider: React.FC = function <T>({ children }) {
  const [list, setList] = useState<T[]>([])
  const [viewData, setViewData] = useState<T>(null)
  const [viewId, setViewId] = useState<number>(null)
  const [betSettings, setBetSettings] = useState<BetSetting[]>()
  const [parentBetSettings, setParentBetSettings] = useState<BetSetting[]>()
  const [betSettingMemberType, setBetSettingMemberType] = useState<MemberType>()
  const [betRatios, setBetRatios] = useState<BetRatio[]>()
  const [accountingSection, setAccountingSection] = useState<Section>()
  const [dashboardInfo, setDashboardInfo] = useState<Dashboard>()
  const [betSummary, setBetSummary] = useState<BetRecordSummary>()
  const [withdrawSummary, setWithdrawSummary] = useState<WithdrawRecSummary>()

  const [
    agentReportSummary,
    setAgentReportSummary,
  ] = useState<AgentReportSummary>()
  const [parentTree, setParentTree] = useState<ParentTreeItem[]>()
  const [rechargeRecSummary, setRechargeRecSummary] = useState<
    RechargeRecSummary[]
  >([])
  const [walletRecSummary, setWalletRecSummary] = useState<WalletRecSummary[]>()

  return (
    <DataContext.Provider
      value={{
        list,
        setList,
        viewData,
        setViewData,
        viewId,
        setViewId,
        betSettings,
        setBetSettings,
        parentBetSettings,
        setParentBetSettings,
        betSettingMemberType,
        setBetSettingMemberType,
        betRatios,
        setBetRatios,
        accountingSection,
        setAccountingSection,
        dashboardInfo,
        setDashboardInfo,
        betSummary,
        setBetSummary,
        rechargeRecSummary,
        setRechargeRecSummary,
        parentTree,
        setParentTree,
        walletRecSummary,
        setWalletRecSummary,
        agentReportSummary,
        setAgentReportSummary,
        withdrawSummary,
        setWithdrawSummary,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = function <T extends {}>() {
  return useContext<ContextState<T>>(DataContext)
}

export default DataProvider
