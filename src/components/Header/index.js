import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {images} from '../../assets/images/images';
import { styles } from './styles';

export const Header = (props) => {
  const {navigation,type} = props;

  const MenuIcon = () => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
        <Image source={images.open_menu} style={{width: 20, height: 20}} />
      </TouchableWithoutFeedback>
    );
  };

  const SearchIcon = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('SearchScreen', {type: type})}>
        <Icon name={'search'} size={20} />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View
      style={styles.container}>
      <MenuIcon/>  
      <SearchIcon/>
    </View>
  );
};
