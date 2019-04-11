import React from 'react';
import { StyleSheet, Text, View ,TextInput, Button} from 'react-native';

export default class App extends React.Component {
  state={
    name: "" , text: "Introduza um nome " , newMess: ""
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>{this.state.text}</Text>
        <TextInput
        style={{marginBottom:10, height: 40, width: 150, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
        selectTextOnFocus={true}
        autoFocus={true}
        onChangeText={(name) => this.setState({name})}
      />
      <Button title="Submeter nome" onPress={this.onAfterName}></Button>
      <Text style={{marginTop:10}}>{this.state.newMess}</Text>
      </View>
    );
  }

  onAfterName = () =>{
    this.setState({newMess: "Olá " + this.state.name})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
