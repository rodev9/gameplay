import React, { ReactNode } from 'react'
import { View, Modal, ModalProps, TouchableWithoutFeedback } from 'react-native'

import { Background } from '../Background'

import { styles } from './styles'

type Props = ModalProps & {
  children: ReactNode
}

export function ModalView({ children, onRequestClose, ...rest }: Props) {
  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="slide"
      onRequestClose={onRequestClose}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.overlay}>
          <Background style={styles.container}>
            <View style={styles.bar} />

            {children}
          </Background>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
