import React from 'react'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

export function GuildIcon() {
  const { secondary50, secondary70 } = theme.colors
  const uri = 'https://cdn.discordapp.com/embed/avatars/0.png'

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary50, secondary70]}
    >
      <Image source={{ uri }} resizeMode="cover" style={styles.icon} />
    </LinearGradient>
  )
}
