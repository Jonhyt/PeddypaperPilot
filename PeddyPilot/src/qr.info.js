import React, { Component } from "react";
import { View, Text} from "react-native";

import styles from "./styles";

export default class QR_GenScreen extends Component {
  state = {
    Text_Output: "hi"
  };

  render() {
    let { Text_Output } = this.state;
    return (
      <View style={styles.QRpage}>
        <Text style={styles.TextTitle}>Text QR Code</Text>
        <Text> { Text_Output } </Text>
      </View>
    );
  }

}
