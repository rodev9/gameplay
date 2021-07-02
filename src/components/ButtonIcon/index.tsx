import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import DiscordImg from '../../assets/discord.svg'

import { styles } from './styles'

type Props = RectButtonProps & {
  title: string
}

export function ButtonIcon({ title, ...rest }: Props) {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <DiscordImg width={24} height={18} />
      </View>

      <Text style={styles.title}>{title}</Text>
    </RectButton>
  )
}
