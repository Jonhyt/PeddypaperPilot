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
import { NavigationActions, NavigationEvents } from "react-navigation";

import styles from "./styles";

export default class CameraPage extends Component {
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
    const { navigate } = this.props.navigation;
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
      {() => navigate("QR_Info")}
      /*     NavigationActions.navigate(
        { routeName: "QR_Info" },
        { qrInfo: lastScannedUrl }
      );*/
    }
  };

  render() {
    let { isFocused } = this.state;
    return (
      <View style={styles.containerCamera}>
        <NavigationEvents
          onWillFocus={() => {
            this.setState({ isFocused: true });
          }}
          onDidBlur={() => {
            this.setState({ isFocused: false });
          }}
        />
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: "#fff" }}>
            Camera permission is not granted
          </Text>
        ) : (
          isFocused && (
            <Camera
              type={Camera.Constants.Type.back}
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
          )
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