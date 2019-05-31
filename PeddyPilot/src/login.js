import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View // Container component
} from "react-native";

import fileConfigs from "./settings.json";
import { NavigationActions } from "react-navigation";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      response: 0,
      hash: ""
    };
  }

  static navigationOptions = {
    headerStyle: {
      elevation: null
    },
    header: null
  };
  async onLoginPress() {
    const { email, password } = this.state;
    console.log(email);
    console.log(password);
    //guarda as credenciais no dispositivo
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);

    /*  hashSync(email+password,5).then(hashed => {
      this.setState({ hash: hashed })
    });
    console.log(this.state.hash);
*/

    //Manda as credenciais para o backoffice e verifica se esta correto
    const url = fileConfigs.url;
    fetch(url.home + url.values, {
      method: "post",
      headers: {
        "Content-type": "text/html; charset=UTF-8"
      },
      body: '{"email":'+email+',"password":'+password+'},'
    })
      .then(response => {
        //se a receber resposta 200 do servidor
        response.ok ? (
          console.log("User Autenticated"),
          //navega para a home page
          NavigationActions.navigate({ routeName: "Home" })
        ) : (
          //se não avisa o codigo de erro vindo do servidor
          console.warn("Error code : "+response.status)
        );
      })
      //caso exista algum erro fora do comum manda para a consola
      .catch(function(error) {
        console.log("Request failed", error);
      });


  }
  //constroi a parte visual do login
  render() {
    return (
      <View style={styles.container}>
        <View behavior="padding" style={styles.container}>
          <KeyboardAvoidingView style={styles.keyboard}>
            <View style={styles.window}>
              <TextInput
              //Local de introdução do username
                placeholder="Username"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.window}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                secureTextEntry
                ref={input => (this.passwordInput = input)}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onLoginPress.bind(this)}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            //            onPress={() => this.props.navigation.navigate("Register")}
            title="Sign up"
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            //            onPress={() => this.props.navigation.navigate("ForgotPassword")}
            title="Forgot Password"
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16a085"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 150
  },
  subtext: {
    color: "#ffffff",
    marginTop: 10,
    width: 160,
    textAlign: "center",
    opacity: 0.8
  },
  keyboard: {
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  button: {
    backgroundColor: "#27ae60",
    paddingVertical: 15
  },
  window: {
    marginBottom: 15
  }
});
