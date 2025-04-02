import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FavoritosContext } from '../../context/FavoritosContext';
import CardMascota from '../../components/CardMascota';

const FavoritosScreen = () => {
  const { favoritos } = useContext(FavoritosContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💖 Mis mascotas favoritas 💖</Text>
      {favoritos.length === 0 ? (
        <Text style={styles.vacio}>No has agregado favoritos aún.</Text>
      ) : (
        favoritos.map((mascota, index) => (
          <CardMascota
            key={index}
            nombre={mascota.nombre}
            imagen={mascota.imagen}
            onFavorite={() => {}}
          />
        ))
      )}
    </ScrollView>
  );
};

export default FavoritosScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffebf0',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 20,
    textShadowColor: '#ff80ab',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  vacio: {
    marginTop: 20,
    fontSize: 18,
    color: '#ad1457',
    fontStyle: 'italic',
  },
});