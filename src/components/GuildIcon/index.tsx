import React from 'react'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import DiscordSvg from '../../assets/discord.svg'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

const { CDN } = process.env

type Props = {
  guildId: string
  icon?: string | null
}

export function GuildIcon({ guildId, icon }: Props) {
  const { secondary50, secondary60 } = theme.colors
  const uri = `${CDN}/icons/${guildId}/${icon}.png`

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary50, secondary60]}
    >
      {icon ? (
        <Image source={{ uri }} resizeMode="cover" style={styles.icon} />
      ) : (
        <DiscordSvg width={40} height={40} />
      )}
    </LinearGradient>
  )
}
