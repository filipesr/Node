import React, { Component } from 'react';
import api from '../services/api';
import ImagePicker from 'react-native-image-picker';

import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image, CheckBox } from 'react-native';

export default class NovaCedula extends Component {
  static navigationOptions = { headerTitle: 'Nova Cédula' };

  state = { preview: null, image: null, cod: '', cpf: '', votoVice: '', votoSecr: '', votoTeso: '', votoExam: '' };

  handleSelectImage = () => {
    ImagePicker.showImagePicker({
      title: 'Selecionar imagem',
    }, upload => {
      if (upload.error) {
        console.log('Error');
      } else if (upload.didCancel) {
        console.log('User canceled');
      } else {
        const preview = {
          uri: `data:image/jpeg;base64,${upload.data}`,
        }

        const image = {
          uri: upload.uri,
          type: upload.type,
          name: `${new Date().getTime()}.jpg`
        }

        this.setState({ preview, image });
      }

    })
  };

  handleSubmit = async () => {
    const data = new FormData();

    data.append('image', this.state.image);
    data.append('cod', this.state.cod);
    data.append('cpf', this.state.cpf);
    data.append('votoVice', this.state.votoVice);
    data.append('votoSecr', this.state.votoSecr);
    data.append('votoTeso', this.state.votoTeso);
    data.append('votoExam', this.state.votoExam);

    await api.post('cedula', data);

    this.props.navigation.navigate('Resultado');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
          <Text style={styles.selectButtonText}>Selecionar imagem</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input} autoCorrect={false} placeholderTextColor="#999"
          placeholder="Código do membro"
          autoCapitalize="cod"
          value={this.state.cod}
          onChangeText={(cod) => this.setState({ cod })} />
        <View style={{ flexDirection: 'column' }}  >
          <Text>Vice Presidência</Text>
          <View style={{ flexDirection: 'row' }}  >
            <CheckBox value={this.state.votoVice} onValueChange={() => this.setState({ votoVice: !this.state.votoVice })} /> <Text>Candidato 1</Text>
            <CheckBox value={this.state.votoVice} onValueChange={() => this.setState({ votoVice: !this.state.votoVice })} /> <Text>Candidato 2</Text>
          </View>
          <View style={{ flexDirection: 'row' }}  >
            <CheckBox value={this.state.votoVice} onValueChange={() => this.setState({ votoVice: !this.state.votoVice })} /> <Text>Candidato 3</Text>
            <CheckBox value={this.state.votoVice} onValueChange={() => this.setState({ votoVice: !this.state.votoVice })} /> <Text>Candidato 4</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
          <Text style={styles.shareButtonText}>Compartilhar imagem</Text>
        </TouchableOpacity>

        {this.state.preview && <Image style={styles.preview} source={this.state.preview} />}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});
