import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },

  name: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 18
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  statusBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8
  },

  statusText: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight,
    fontSize: 13
  }
})
