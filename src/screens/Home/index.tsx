import React, { useState } from 'react'
import { View, FlatList } from 'react-native'

import { Profile } from '../../components/Profile'
import { AddButton } from '../../components/AddButton'
import { Categories } from '../../components/Categories'
import { ListHeader } from '../../components/ListHeader'
import { Appointment } from '../../components/Appointment'
import { Divider } from '../../components/Divider'

import { styles } from './styles'

const appointments = [
  {
    id: '1',
    guild: {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true
    },
    category: '1',
    date: '18/06 às 21:00h',
    description:
      'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
  },
  {
    id: '2',
    guild: {
      id: '2',
      name: 'Yeah, boy',
      icon: null,
      owner: false
    },
    category: '3',
    date: '23/06 às 19:00h',
    description:
      'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
  }
]

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('')

  function handleSelectCategory(id: string) {
    if (id === selectedCategory) setSelectedCategory('')
    else setSelectedCategory(id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />

        <AddButton />
      </View>

      <Categories
        selectedCategory={selectedCategory}
        setCategory={handleSelectCategory}
      />

      <View style={styles.content}>
        <ListHeader title="Jogos agendados" subtitle="Total 6" />

        <FlatList
          style={styles.appointments}
          showsVerticalScrollIndicator={false}
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Appointment data={item} />}
          ItemSeparatorComponent={Divider}
        />
      </View>
    </View>
  )
}
