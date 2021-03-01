import { useDataContext } from '@/context/DataContext'
import { gameOpts, playOpts, sectionOpts } from '@/lib/options'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import EditBetSettingParams from './EditBetSettingParams'
import _ from 'lodash'
import { BetSetting } from '@/types/api/Member'
import BetSettingParams from './BetSettingParams'
import { MemberType } from '@/lib/enums'

function BetSettingsTabGroup({ isEdit }: { isEdit?: boolean }) {
  const { betSettings } = useDataContext()

  return (
    <Tabs variant="enclosed">
      <TabList>
        {gameOpts.map((g, i) => (
          <Tab key={i}>{g.label}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {gameOpts.map((g, g_i) => (
          <TabPanel key={g_i} mx="-15px" pt="30px">
            {sectionOpts.map((s, s_i) => {
              return (
                <Box key={`${g_i}_${s_i}`}>
                  {playOpts.map((p, p_i) => {
                    const index = _.findIndex(betSettings, {
                      game_code: g.value,
                      section_code: s.value,
                      play_code: p.value,
                    })
                    if (isEdit) {
                      return (
                        <EditBetSettingParams
                          key={p_i}
                          game={g}
                          section={s}
                          play={p}
                          data={betSettings?.[index]}
                        />
                      )
                    }
                    return (
                      <BetSettingParams
                        key={p_i}
                        game={g}
                        section={s}
                        play={p}
                      />
                    )
                  })}
                </Box>
              )
            })}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default BetSettingsTabGroup
