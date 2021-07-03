import React, { ReactNode } from 'react'
import { View, Modal, ModalProps } from 'react-native'

import { Background } from '../Background'

import { styles } from './styles'

type Props = ModalProps & {
  children: ReactNode
}

export function ModalView({ children, ...rest }: Props) {
  return (
    <Modal transparent statusBarTranslucent animationType="slide" {...rest}>
      <View style={styles.overlay}>
        <Background style={styles.container}>
          <View style={styles.bar} />

          {children}
        </Background>
      </View>
    </Modal>
  )
}
