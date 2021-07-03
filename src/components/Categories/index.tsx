import React from 'react'
import { ScrollView } from 'react-native'

import { categories } from '../../utils/categories'

import { Category } from '../Category'

import { styles } from './styles'

type Props = {
  selectedCategory: string
  hasCheckBox?: boolean
  setCategory(id: string): any
}

export function Categories({
  selectedCategory,
  hasCheckBox = false,
  setCategory
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map(category => (
        <Category
          title={category.title}
          icon={category.icon}
          hasCheckBox={hasCheckBox}
          checked={category.id === selectedCategory}
          onPress={() => setCategory(category.id)}
          key={category.id}
        />
      ))}
    </ScrollView>
  )
}
