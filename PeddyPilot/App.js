import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions
} from "react-navigation";

import CameraPage from "./src/camera.page";
import QRgenPage from "./src/qr.gen";
import QRinfoPage from "./src/qr.info";
import WebApiPage from "./src/backend.link";
import styles from "./src/styles";

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>

        <TouchableOpacity
          style={styles.ShowButton}
          onPress={() => {
            this.props.navigation.dispatch(
              NavigationActions.navigate({ routeName: "QR_Generator" })
            );
          }}
        >
          <Text style={styles.TextStyle} > Go to QR Generator </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ShowButton}
          onPress={() => {
            this.props.navigation.dispatch(
              NavigationActions.navigate({ routeName: "WebApi" })
            );
          }}
        >
          <Text style={styles.TextStyle} > Go talk with the api </Text>
        </TouchableOpacity>
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
class WebApiScreen extends React.Component {
  render() {
    return <WebApiPage />;
  }
}

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    QR_Generator: QR_GenScreen,
    WebApi: WebApiScreen
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
