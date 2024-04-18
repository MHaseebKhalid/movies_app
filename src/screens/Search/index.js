import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchScreen=()=> {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>SearchScreen</Text>
      <Icon name="rocket" size={30} color="#900" />
    </View>
  )
}