import React, { ReactNode } from 'react'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

type Props = Omit<LinearGradientProps, 'colors'> & {
  children: ReactNode
}

export function Background({ ...rest }: Props) {
  const { secondary80, secondary100 } = theme.colors

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary80, secondary100]}
      {...rest}
    />
  )
}
