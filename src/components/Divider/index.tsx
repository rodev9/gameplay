import React from 'react'
import { View } from 'react-native'

import { styles } from './styles'

type Props = {
  center?: boolean
}

export function Divider({ center }: Props) {
  return (
    <View
      style={[
        styles.container,
        center ? { marginVertical: 12 } : { marginTop: 2, marginBottom: 31 }
      ]}
    />
  )
}
