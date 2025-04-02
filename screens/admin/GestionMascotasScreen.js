import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, Modal,
  TouchableOpacity, FlatList
} from 'react-native';

const GestionMascotasScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mascotas, setMascotas] = useState([]);
  const [mascotaEditar, setMascotaEditar] = useState(null);

  const manejarEnvio = () => {
    if (!nombre || !tipo) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    const nueva = { id: Date.now().toString(), nombre, tipo };
    setMascotas([...mascotas, nueva]);
    setMensaje(`Mascota "${nombre}" (${tipo}) registrada (simulado).`);
    setNombre('');
    setTipo('');
    setModalAgregar(false);
  };

  const manejarEdicion = () => {
    if (!mascotaEditar) return;
    setMascotas(mascotas.map(m => m.id === mascotaEditar.id ? mascotaEditar : m));
    Alert.alert('Mascota editada (simulado)');
    setMascotaEditar(null);
    setModalEditar(false);
  };

  const manejarEliminacion = () => {
    if (mascotas.length === 0) return;
    const ultima = mascotas[mascotas.length - 1];
    setMascotas(mascotas.filter(m => m.id !== ultima.id));
    Alert.alert(`Mascota "${ultima.nombre}" eliminada (simulado)`);
    setModalEliminar(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐶 Gestión de Mascotas 🐱</Text>

      <Button title="Agregar mascota" onPress={() => setModalAgregar(true)} color="#00bcd4" />
      <Button title="Editar mascota" onPress={() => {
        const ultima = mascotas[mascotas.length - 1];
        setMascotaEditar(ultima);
        setModalEditar(true);
      }} color="#ff9800" />
      <Button title="Eliminar última mascota" onPress={() => setModalEliminar(true)} color="#f44336" />

      <FlatList
        data={mascotas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.mascotaItem}>{item.nombre} ({item.tipo})</Text>
        )}
      />

      {/* Modal Agregar */}
      <Modal visible={modalAgregar} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>➕ Agregar mascota</Text>
            <TextInput
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
            />
            <View style={styles.tipoContainer}>
              <TouchableOpacity onPress={() => setTipo('Perro')} style={[styles.tipoBtn, tipo === 'Perro' && styles.tipoActivo]}>
                <Text>Perro</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTipo('Gato')} style={[styles.tipoBtn, tipo === 'Gato' && styles.tipoActivo]}>
                <Text>Gato</Text>
              </TouchableOpacity>
            </View>
            <Button title="Registrar" onPress={manejarEnvio} color="#4caf50" />
            <Button title="Cancelar" onPress={() => setModalAgregar(false)} color="gray" />
          </View>
        </View>
      </Modal>

      {/* Modal Editar */}
      <Modal visible={modalEditar} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>✏️ Editar mascota</Text>
            <TextInput
              placeholder="Nuevo nombre"
              value={mascotaEditar?.nombre || ''}
              onChangeText={(text) => setMascotaEditar({ ...mascotaEditar, nombre: text })}
              style={styles.input}
            />
            <View style={styles.tipoContainer}>
              <TouchableOpacity onPress={() => setMascotaEditar({ ...mascotaEditar, tipo: 'Perro' })} style={[styles.tipoBtn, mascotaEditar?.tipo === 'Perro' && styles.tipoActivo]}>
                <Text>Perro</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMascotaEditar({ ...mascotaEditar, tipo: 'Gato' })} style={[styles.tipoBtn, mascotaEditar?.tipo === 'Gato' && styles.tipoActivo]}>
                <Text>Gato</Text>
              </TouchableOpacity>
            </View>
            <Button title="Guardar cambios" onPress={manejarEdicion} color="#2196f3" />
            <Button title="Cancelar" onPress={() => setModalEditar(false)} color="gray" />
          </View>
        </View>
      </Modal>

      {/* Modal Eliminar */}
      <Modal visible={modalEliminar} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>❗ ¿Eliminar última mascota?</Text>
            <Button title="Eliminar" onPress={manejarEliminacion} color="#e53935" />
            <Button title="Cancelar" onPress={() => setModalEliminar(false)} color="gray" />
          </View>
        </View>
      </Modal>

      {mensaje !== '' && <Text style={styles.mensaje}>{mensaje}</Text>}
    </View>
  );
};

export default GestionMascotasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff8e1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff5722',
  },
  mascotaItem: {
    marginTop: 10,
    fontSize: 16,
    backgroundColor: '#ffe0b2',
    padding: 10,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  tipoBtn: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  tipoActivo: {
    backgroundColor: '#4db6ac',
  },
  mensaje: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4caf50',
    fontWeight: 'bold',
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#673ab7',
  },
});