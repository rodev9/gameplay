import React from 'react'
import { Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'

type Props = RectButtonProps & {
  children: string
}

export function Button({ children, ...rest }: Props) {
  return (
    <RectButton style={styles.container} {...rest}>
      <Text style={styles.title}>{children}</Text>
    </RectButton>
  )
}
