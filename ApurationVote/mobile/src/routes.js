import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Image } from 'react-native';

import NovaCedula from './pages/NovaCedula';
import Resultado from './pages/Resultado';

import logo from './assets/logo.png';

export default createAppContainer(
    createStackNavigator({
        NovaCedula,
        Resultado,
    }, {
            initialRouteName: 'NovaCedula',
            defaultNavigationOptions: {
                headerTintColor: '#000',
                headerTitle: <Image style={{ marginHorizontal: 20 }} source={logo} />,
                headerBackTitle: null,
            },
            mode: 'modal'
        })
);