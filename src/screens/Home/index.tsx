import React, { useState, useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { View, FlatList } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_APPOINTMENTS } from '../../configs/storage'

import { Background } from '../../components/Background'

import { Loading } from '../../components/Loading'
import { Profile } from '../../components/Profile'
import { AddButton } from '../../components/AddButton'
import { Categories } from '../../components/Categories'
import { ListHeader } from '../../components/ListHeader'
import { Appointment, AppointmentProps } from '../../components/Appointment'
import { Divider } from '../../components/Divider'

import { styles } from './styles'

export function Home() {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(STORAGE_APPOINTMENTS)
    const appointments: AppointmentProps[] = storage ? JSON.parse(storage) : []

    if (selectedCategory) {
      setAppointments(
        appointments.filter(item => item.category === selectedCategory)
      )
    } else setAppointments(appointments)

    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments()
    }, [selectedCategory])
  )

  function handleSelectCategory(id: string) {
    if (id === selectedCategory) setSelectedCategory('')
    else setSelectedCategory(id)
  }

  function handleNavigateToAppointment(appointment: AppointmentProps) {
    navigation.navigate('Appointment', { appointment })
  }

  function handleCreateAppointment() {
    navigation.navigate('CreateAppointment')
  }

  return (
    <Background>
      <View style={styles.header}>
        <Profile />

        <AddButton onPress={handleCreateAppointment} />
      </View>

      <Categories
        selectedCategory={selectedCategory}
        setCategory={handleSelectCategory}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Jogos agendados"
            subtitle={`Total ${appointments.length}`}
          />

          <FlatList
            style={styles.appointments}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleNavigateToAppointment(item)}
              />
            )}
            ItemSeparatorComponent={Divider}
          />
        </>
      )}
    </Background>
  )
}
