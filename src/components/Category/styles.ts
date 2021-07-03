import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 8
  },

  content: {
    width: 100,
    height: 116,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20
  },

  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 15,
    marginTop: 16
  },

  checkbox: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 10,
    height: 10,

    borderRadius: 3
  },

  unchecked: {
    backgroundColor: theme.colors.secondary100,
    borderColor: theme.colors.secondary50,
    borderWidth: 1
  },

  checked: {
    backgroundColor: theme.colors.primary
  }
})
