import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 

import CameraPage from './src/camera.page';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to QR Reader"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'QR_reader' })
              ],
            }))
          }}
        />
      </View>
    );
  }  
}

class QR_readerScreen extends React.Component {
  render() {
    return (
        <CameraPage/>
    );
  }  
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  QR_reader: {
    screen: QR_readerScreen,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);