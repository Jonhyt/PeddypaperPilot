import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import { Location, Permissions } from "expo";

import styles from "./styles";
import { NavigationActions } from "react-navigation";

export default class FetchGpsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: null,
      errorMessage: null
    };
  }
  componentDidMount() {
    testers = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
      }
    };
    this._getUserLocation();
  }

  _getUserLocation = () => {
    Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      timeout: 50000
    })
      .then(response => {
        this.setState({ dataSource: response });
        console.log(response);
      })
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        error.code === "E_LOCATION_SERVICES_DISABLED"
          ? Alert.alert(
              "Check Location Services",
              "Please check if locations services are enabled",
              [
                {
                  text: "Ok",
                  onPress: () =>
                      NavigationActions.navigate({ routeName: "Home" })
                    
                }
              ],
              { cancellable: false }
            )
          : console.warn(error.code);
      }); //to catch the errors if any
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      />
    );
  };

  render() {
    if (this.state.errorMessage) {
      return (
        <View style={styles.container}>
          <Text style={styles.TextStyle}> {errorMessage} </Text>
        </View>
      );
    }
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }

    const data = this.state.dataSource;
    return (
      <View style={styles.containerList}>
        <Text style={styles.lightText}> Timestamp : {data.timestamp}</Text>
        <Text style={styles.lightText}> Heading : {data.coords.heading}</Text>
        <Text style={styles.lightText}>
          {" "}
          Longitude : {data.coords.longitude}{" "}
        </Text>
        <Text style={styles.lightText}> Speed : {data.coords.speed}</Text>
        <Text style={styles.lightText}> Altitude : {data.coords.altitude}</Text>
        <Text style={styles.lightText}> Latitude : {data.coords.latitude}</Text>
        <Text style={styles.lightText}> Accuracy : {data.coords.accuracy}</Text>
        <TouchableOpacity
          style={styles.ShowButton}
          onPress={() => {
            this._getUserLocation();
          }}
        >
          <Text style={styles.TextStyle}> Recheck your GPS location </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
