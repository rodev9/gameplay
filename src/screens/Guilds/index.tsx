import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'

import { api } from '../../services/api'

import { Guild, GuildProps } from '../../components/Guild'
import { Loading } from '../../components/Loading'
import { Divider } from '../../components/Divider'

import { styles } from './styles'

type Props = {
  onGuildSelected(guild: GuildProps): any
}

export function Guilds({ onGuildSelected }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchGuilds() {
      const response = await api.get('/users/@me/guilds')

      setGuilds(response.data)
      setIsLoading(false)
    }

    fetchGuilds()
  }, [])

  if (isLoading) return <Loading />

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
