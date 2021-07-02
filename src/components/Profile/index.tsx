import React from 'react'
import { View, Text } from 'react-native'

import { Avatar } from '../Avatar'

import { styles } from './styles'

export function Profile() {
  return (
    <View style={styles.container}>
      <Avatar imageURL="https://github.com/romilodev.png" />

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>

          <Text style={styles.username}>Romilo</Text>
        </View>

        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
    </View>
  )
}
