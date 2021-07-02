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
    backgroundColor: theme.colors.secondary40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7
  },

  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 15
  },

  check: {
    width: 10,
    height: 10,
    backgroundColor: theme.colors.secondary100,
    alignSelf: 'flex-end',
    marginRight: 7,
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
    borderRadius: 3
  },

  checked: {
    width: 10,
    height: 10,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-end',
    marginRight: 7,
    borderRadius: 3
  }
})
