import React, { Component } from "react";
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { BarCodeScanner, Camera, Permissions } from "expo";
import BarcodeMask from "react-native-barcode-mask";

import styles from "./styles";

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };
  //On detecting a QRCode
  _handleBarCodeScanned = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: "#fff" }}>
            Camera permission is not granted
          </Text>
        ) : (
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={this._handleBarCodeScanned}
            style={{
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width
            }}
          />
        )}
        <BarcodeMask
          edgeColor={"#62B1F6"}
          width={300}
          height={300}
          showAnimatedLine={false}
        />

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  //Open alert text on press
  _handlePressUrl = () => {
    Alert.alert(
      "Open this URL?",
      this.state.lastScannedUrl,
      [
        {
          text: "Yes",
          onPress: () => Linking.openURL(this.state.lastScannedUrl)
        },
        { text: "No", onPress: () => {} }
      ],
      { cancellable: false }
    );
  };
  //To clean last QRcode scan
  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };
  //Show Scanned info to user
  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={2} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };
}
