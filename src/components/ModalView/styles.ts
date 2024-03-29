import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay
  },

  container: {
    flex: 1,
    marginTop: getStatusBarHeight() + 42
  },

  bar: {
    width: 39,
    height: 2,
    borderRadius: 2,
    backgroundColor: theme.colors.secondary30,
    alignSelf: 'center',
    marginTop: 13,
    marginBottom: 30
  }
})
