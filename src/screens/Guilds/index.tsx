import React from 'react'
import { FlatList } from 'react-native'

import { Guild, GuildProps } from '../../components/Guild'
import { Divider } from '../../components/Divider'

import { styles } from './styles'

const guilds = [
  {
    id: '1',
    name: 'Lendários',
    icon: null,
    owner: true
  },
  {
    id: '2',
    name: 'Yeah, boy',
    icon: null,
    owner: false
  }
]

type Props = {
  onGuildSelected(guild: GuildProps): any
}

export function Guilds({ onGuildSelected }: Props) {
  return (
    <FlatList
      data={guilds}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Guild data={item} onPress={() => onGuildSelected(item)} />
      )}
      ItemSeparatorComponent={() => <Divider center />}
      ListHeaderComponent={() => <Divider center />}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingTop: 74, paddingBottom: 40 }}
    />
  )
}
