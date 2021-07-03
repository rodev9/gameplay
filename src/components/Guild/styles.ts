import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 24
  },

  content: {
    flex: 1,
    justifyContent: 'center'
  },

  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 18,
    marginBottom: 4
  },

  subtitle: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight,
    fontSize: 13
  }
})
