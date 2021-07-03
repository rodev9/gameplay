import React from 'react'
import { ImageBackground, View, Text, FlatList } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

import { Background } from '../../components/Background'

import { Header } from '../../components/Header'
import { ListHeader } from '../../components/ListHeader'
import { Member } from '../../components/Member'
import { Divider } from '../../components/Divider'
import { ButtonIcon } from '../../components/ButtonIcon'

import { Fontisto } from '@expo/vector-icons'
import bannerImg from '../../assets/banner.png'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

const members = [
  {
    id: '1',
    username: 'Romilo',
    avatar_url: 'https://github.com/romilodev.png',
    status: 'online'
  },
  {
    id: '2',
    username: 'Rodrigo',
    avatar_url: 'https://github.com/rodrigorgtic.png',
    status: 'offline'
  }
]

export function AppointmentDetails() {
  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>

          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>

      <ListHeader title="Jogadores" subtitle="Total 3" />

      <FlatList
        style={styles.members}
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={Divider}
      />

      <View style={styles.footer}>
        <ButtonIcon title="Entrar" />
      </View>
    </Background>
  )
}
