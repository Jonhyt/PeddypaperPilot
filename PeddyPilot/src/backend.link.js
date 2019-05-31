import React from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";

import styles from "./styles";
import fileConfigs from "./settings.json"

export default class WebApiPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Route Listing",
      headerStyle: { backgroundColor: "#000" },
      headerTitleStyle: { textAlign: "center", flex: 1 }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
    };
  }
  componentDidMount() {
    const url = fileConfigs.url;
    fetch(url.home+url.percursos)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          dataSource: responseJson
        });
        
        console.log(this.state.dataSource)
      })
      .catch(error => console.log(error)); //to catch the errors if any

  }
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
  renderItem = data => (
    <TouchableOpacity style={styles.list}>
      <Text style={styles.lightText}>Nome : {data.item.Nome}</Text>
      <Text style={styles.lightText}>Número de participantes : {data.item.NumParticipantes}</Text>
      <Text style={styles.lightText}>Data Início : {data.item.DataInicio.substring(0,data.item.DataInicio.indexOf("T"))}</Text>
      <Text style={styles.lightText}>Hora Início : {data.item.DataInicio.substring(data.item.DataInicio.indexOf("T")+1)}</Text>
      <Text style={styles.lightText}>A decorrer : {data.item.JaComecou === false ? ("Não") : ("Sim")}</Text>
    </TouchableOpacity>
  );
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <View style={styles.containerList}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.Id.toString()}
        />
      </View>
    );
  }
}
