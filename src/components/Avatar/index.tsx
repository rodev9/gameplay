import React from 'react'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

type Props = {
  imageURL: string
}

export function Avatar({ imageURL }: Props) {
  const { secondary50, secondary60 } = theme.colors

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary50, secondary60]}
    >
      <Image source={{ uri: imageURL }} style={styles.avatar} />
    </LinearGradient>
  )
}
