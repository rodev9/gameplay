import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 234
  },

  bannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 40,
    marginBottom: 24
  },

  title: {
    fontSize: 28,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 21,
    fontFamily: theme.fonts.text400,
    color: theme.colors.heading,
    marginTop: 12
  },

  members: {
    marginTop: 24,
    marginLeft: 24
  },

  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginBottom: getBottomSpace()
  }
})
