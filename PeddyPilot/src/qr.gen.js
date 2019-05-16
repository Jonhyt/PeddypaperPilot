import React, { Component } from "react";
import { View, Text, TextInput} from "react-native";
import QRCode from "react-native-qrcode-svg";

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
        <TextInput
          style={styles.TextInput}
          onChangeText={text => this.setState({ Text_Output: text })}
          underlineColorAndroid="transparent"
          placeholder="Enter Message"
        />
        <QRCode
          value={Text_Output === "" ? state.Text_Output : Text_Output}
          size={300}
          bgColor="#000"
          fgColor="#fff"
        />
      </View>
    );
  }

}
