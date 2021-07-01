import React from 'react'
import { View, Text, Image, StatusBar } from 'react-native'

import { ButtonIcon } from '../../components/ButtonIcon'

import illustraionImg from '../../assets/illustration.png'

import { styles } from './styles'

export function SignIn() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Image source={illustraionImg} resizeMode="stretch" style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>
          Organiza as{'\n'}
          tuas jogatinas{'\n'}
          facilmente
        </Text>

        <Text style={styles.subtitle}>
          Cria grupos para jogares os teus jogos{'\n'}
          favoritos com os teus amigos
        </Text>

        <ButtonIcon
          title="Entrar com Discord"
          activeOpacity={0.7}
        />
      </View>
    </View>
  )
}
