import React from "react";
import { View, Text, Button } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  StackActions,
  NavigationActions
} from "react-navigation";

import CameraPage from "./src/camera.page";
import QRgenPage from "./src/qr.gen";
import QRinfoPage from "./src/qr.info";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to QR Generator"
          onPress={() => {
            this.props.navigation.dispatch(
              NavigationActions.navigate({ routeName: "QR_Generator" })
            );
          }}
        />
      </View>
    );
  }
}

class QR_ReaderScreen extends React.Component {
  render() {
    return <CameraPage />;
  }
}
class QR_InfoScreen extends React.Component {
  render() {
    return <QRinfoPage />;
  }
}
class QR_GenScreen extends React.Component {
  render() {
    return <QRgenPage />;
  }
}

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    QR_Generator: QR_GenScreen
  },
  {
    initialRouteName: "Home"
  }
);

const QR_Stack = createStackNavigator(
  {
    QR_Reader: QR_ReaderScreen,
    QR_Info: QR_InfoScreen
  },
  {
    initialRouteName: "QR_Reader"
  }
);

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  QR_Reader: QR_Stack
});

export default createAppContainer(TabNavigator);
