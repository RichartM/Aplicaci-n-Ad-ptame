import React, { useEffect, useState, useContext } from 'react';
import {
  View, ScrollView, Text, ActivityIndicator, Alert, StyleSheet, Modal,
  Image, TouchableOpacity, Button
} from 'react-native';
import axios from 'axios';
import CardMascota from '../../components/CardMascota';
import { FavoritosContext } from '../../context/FavoritosContext';

const MascotasScreen = () => {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { agregarFavorito } = useContext(FavoritosContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    const cargarMascotas = async () => {
      try {
        const perros = await axios.get('https://dog.ceo/api/breeds/image/random/5');
        const gatos = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5');

        const mascotasData = [
          ...perros.data.message.map((url, i) => ({
            tipo: 'Perro', nombre: `Firulais ${i + 1}`, imagen: url,
            raza: 'Labrador', tamano: 'Grande',
            descripcion: 'Perro muy juguetón y amigable.'
          })),
          ...gatos.data.map((gato, i) => ({
            tipo: 'Gato', nombre: `Michi ${i + 1}`, imagen: gato.url,
            raza: 'Siames', tamano: 'Pequeño',
            descripcion: 'Gato curioso y cariñoso.'
          }))
        ];

        setMascotas(mascotasData);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar las mascotas');
      } finally {
        setCargando(false);
      }
    };

    cargarMascotas();
  }, []);

  const agregarAFavoritos = (mascota) => {
    agregarFavorito(mascota);
    Alert.alert('Favoritos', `${mascota.nombre} fue agregado a favoritos.`);
  };

  const filtrarMascotas = () => {
    if (filtro === 'Todos') return mascotas;
    return mascotas.filter(m => m.tamano === filtro);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>✨ Mascotas para adopción ✨</Text>

      <View style={styles.filtros}>
        {['Todos', 'Grande', 'Pequeño'].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFiltro(f)}
            style={[styles.filtroBtn, filtro === f && styles.filtroActivo]}
          >
            <Text style={styles.filtroTexto}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color="#ab47bc" style={{ marginTop: 20 }} />
      ) : (
        filtrarMascotas().map((mascota, index) => (
          <CardMascota
            key={index}
            nombre={mascota.nombre}
            imagen={mascota.imagen}
            onFavorite={() => agregarAFavoritos(mascota)}
            onPress={() => {
              setMascotaSeleccionada(mascota);
              setModalVisible(true);
            }}
          />
        ))
      )}

      {mascotaSeleccionada && (
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: mascotaSeleccionada.imagen }} style={styles.modalImagen} />
              <Text style={styles.modalNombre}>{mascotaSeleccionada.nombre}</Text>
              <Text>Raza: {mascotaSeleccionada.raza}</Text>
              <Text>Tamaño: {mascotaSeleccionada.tamano}</Text>
              <Text style={styles.descripcion}>{mascotaSeleccionada.descripcion}</Text>
              <Button title="Enviar solicitud de adopción" onPress={() => Alert.alert('¡Enviado!', 'Tu solicitud ha sido enviada.')} color="#4caf50" />
              <Button title="Cerrar" onPress={() => setModalVisible(false)} color="#757575" />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

export default MascotasScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f3e5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#6a1b9a',
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 10,
  },
  filtroBtn: {
    backgroundColor: '#ce93d8',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filtroActivo: {
    backgroundColor: '#ab47bc',
  },
  filtroTexto: {
    fontWeight: 'bold',
    color: '#4a148c',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  modalImagen: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalNombre: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#7b1fa2',
  },
  descripcion: {
    marginVertical: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});