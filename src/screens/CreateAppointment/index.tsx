import React, { useState } from 'react'
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Platform
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_APPOINTMENTS } from '../../configs/storage'

import { Background } from '../../components/Background'

import { Header } from '../../components/Header'
import { Categories } from '../../components/Categories'
import { GuildIcon } from '../../components/GuildIcon'
import { SmallInput } from '../../components/SmallInput'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { ModalView } from '../../components/ModalView'
import { Guilds } from '../Guilds'

import { Feather } from '@expo/vector-icons'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

import { GuildProps } from '../../components/Guild'

export function CreateAppointment() {
  const navigation = useNavigation()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [isGuildsModalOpen, setIsGuildsModalOpen] = useState(false)
  const [selectedGuild, setSelectedGuild] = useState<GuildProps | null>(null)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [description, setDescription] = useState('')

  function handleSelectCategory(id: string) {
    setSelectedCategory(id)
  }

  function handleOpenGuildsModal() {
    setIsGuildsModalOpen(true)
  }

  function handleCloseGuildsModal() {
    setIsGuildsModalOpen(false)
  }

  function handleSelectGuild(guild: GuildProps) {
    setSelectedGuild(guild)
    setIsGuildsModalOpen(false)
  }

  async function handleSubmit() {
    const newAppointment = {
      id: uuid.v4(),
      guild: selectedGuild,
      category: selectedCategory,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(STORAGE_APPOINTMENTS)
    const appointments = storage ? JSON.parse(storage) : []

    await AsyncStorage.setItem(
      STORAGE_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    )

    navigation.navigate('Home')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar jogo" />

          <Text
            style={[
              styles.label,
              { marginHorizontal: 24, marginTop: 32, marginBottom: 12 }
            ]}
          >
            Categoria
          </Text>

          <Categories
            hasCheckBox
            selectedCategory={selectedCategory}
            setCategory={handleSelectCategory}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuildsModal}>
              <View style={styles.select}>
                {selectedGuild ? (
                  <GuildIcon
                    guildId={selectedGuild.id}
                    icon={selectedGuild.icon}
                  />
                ) : (
                  <View style={styles.selectIcon} />
                )}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {selectedGuild
                      ? selectedGuild.name
                      : 'Seleciona um servidor'}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>Data</Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setDay} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} onChangeText={setMonth} />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>Hora</Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setHour} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} onChangeText={setMinute} />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.textLimit}>Max. 100 caracteres</Text>
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button onPress={handleSubmit}>Agendar</Button>
            </View>
          </View>
        </ScrollView>

        <ModalView
          visible={isGuildsModalOpen}
          onRequestClose={handleCloseGuildsModal}
        >
          <Guilds onGuildSelected={handleSelectGuild} />
        </ModalView>
      </Background>
    </KeyboardAvoidingView>
  )
}
