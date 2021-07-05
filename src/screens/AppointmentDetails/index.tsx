import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import {
  ImageBackground,
  View,
  Text,
  FlatList,
  Alert,
  Share,
  Platform
} from 'react-native'
import * as Linking from 'expo-linking'
import { BorderlessButton } from 'react-native-gesture-handler'

import { api } from '../../services/api'

import { Background } from '../../components/Background'

import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { ListHeader } from '../../components/ListHeader'
import { Member, MemberProps } from '../../components/Member'
import { Divider } from '../../components/Divider'
import { ButtonIcon } from '../../components/ButtonIcon'

import { Fontisto } from '@expo/vector-icons'
import bannerImg from '../../assets/banner.png'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

import { AppointmentProps } from '../../components/Appointment'

type Params = {
  appointment: AppointmentProps
}

type GuildsWidget = {
  id: string
  name: string
  instant_invite: string | null
  members: MemberProps[]
  presence_count: number
}

export function AppointmentDetails() {
  const route = useRoute()
  const { appointment } = route.params as Params
  const [isLoading, setIsLoading] = useState(true)
  const [guild, setGuild] = useState<GuildsWidget>()

  useEffect(() => {
    async function fetchGuildWidget() {
      try {
        const response = await api.get(
          `/guilds/${appointment.guild.id}/widget.json`
        )

        setGuild(response.data)
      } catch {
        Alert.alert(
          'Widget desativado',
          'Ative o widget do servidor nas configurações do mesmo.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchGuildWidget()
  }, [appointment])

  function handleShare() {
    if (!guild?.instant_invite) return

    const message =
      Platform.OS === 'ios'
        ? `Entra no ${appointment.guild.name}`
        : guild.instant_invite

    Share.share({
      message,
      url: guild.instant_invite
    })
  }

  function handleOpenGuild() {
    if (!guild?.instant_invite) return

    Linking.openURL(guild.instant_invite)
  }

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guild?.instant_invite && (
            <BorderlessButton onPress={handleShare}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{appointment.guild.name}</Text>

          <Text style={styles.subtitle}>{appointment.description}</Text>
        </View>
      </ImageBackground>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${guild?.presence_count || 0}`}
          />

          <FlatList
            style={styles.members}
            data={guild?.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={Divider}
          />

          {guild?.instant_invite && (
            <View style={styles.footer}>
              <ButtonIcon title="Entrar" onPress={handleOpenGuild} />
            </View>
          )}
        </>
      )}
    </Background>
  )
}
