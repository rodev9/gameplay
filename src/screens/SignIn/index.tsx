import React from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'

import { useAuth } from '../../hooks/auth'

import { Background } from '../../components/Background'
import { ButtonIcon } from '../../components/ButtonIcon'

import illustraionImg from '../../assets/illustration.png'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

export function SignIn() {
  const { signIn, isLoading } = useAuth()

  function handleSignIn() {
    signIn()
  }

  return (
    <Background style={styles.container}>
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

        {isLoading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : (
          <ButtonIcon title="Entrar com Discord" onPress={handleSignIn} />
        )}
      </View>
    </Background>
  )
}
