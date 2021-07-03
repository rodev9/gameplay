import React, { useState } from 'react'
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Platform
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

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
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isGuildsModalOpen, setIsGuildsModalOpen] = useState(false)
  const [selectedGuild, setSelectedGuild] = useState<GuildProps | null>(null)

  function handleSelectCategory(id: string) {
    if (id === selectedCategory) setSelectedCategory('')
    else setSelectedCategory(id)
  }

  function handleOpenGuildsModal() {
    setIsGuildsModalOpen(true)
  }

  function handleSelectGuild(guild: GuildProps) {
    setSelectedGuild(guild)
    setIsGuildsModalOpen(false)
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
                  <GuildIcon />
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
                <Text style={styles.label}>Data</Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>

              <View>
                <Text style={styles.label}>Hora</Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.textLimit}>Max. 100 caracteres</Text>
            </View>

            <TextArea multiline maxLength={100} numberOfLines={5} />

            <View style={styles.footer}>
              <Button>Agendar</Button>
            </View>
          </View>
        </ScrollView>

        <ModalView visible={isGuildsModalOpen}>
          <Guilds onGuildSelected={handleSelectGuild} />
        </ModalView>
      </Background>
    </KeyboardAvoidingView>
  )
}
