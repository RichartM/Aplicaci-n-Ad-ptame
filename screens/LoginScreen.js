import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const LoginPantalla = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const { login } = useContext(AuthContext);

  const iniciarSesion = () => {
    if (!usuario || !clave) {
      Alert.alert('Faltan datos', 'Por favor completa ambos campos.');
      return;
    }
    login(usuario.toLowerCase(), clave);
  };

  return (
    <View style={estilos.wrapper}>
      <Text style={estilos.encabezado}>Bienvenido a AdoptaFácil 🐾</Text>
      <TextInput
        style={estilos.campoTexto}
        placeholder="Nombre de usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />
      <TextInput
        style={estilos.campoTexto}
        placeholder="Contraseña"
        secureTextEntry
        value={clave}
        onChangeText={setClave}
      />
      <Pressable style={estilos.boton} onPress={iniciarSesion}>
        <Text style={estilos.textoBoton}>Ingresar</Text>
      </Pressable>
    </View>
  );
};

export default LoginPantalla;

const estilos = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 25,
  },
  encabezado: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '600',
  },
  campoTexto: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
