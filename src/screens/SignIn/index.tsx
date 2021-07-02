import React from 'react'
import { View, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ButtonIcon } from '../../components/ButtonIcon'

import illustraionImg from '../../assets/illustration.png'

import { styles } from './styles'

export function SignIn() {
  const navigation = useNavigation()

  function handleSignIn() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Image
        source={illustraionImg}
        resizeMode="stretch"
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Conecta-te e organiza as tuas jogatinas
        </Text>

        <Text style={styles.subtitle}>
          Cria grupos para jogares os teus jogos favoritos com os teus amigos
        </Text>

        <ButtonIcon title="Entrar com Discord" onPress={handleSignIn} />
      </View>
    </View>
  )
}
