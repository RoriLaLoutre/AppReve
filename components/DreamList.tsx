// components/DreamList.tsx

import React, { useCallback, useEffect, useState } from 'react';
import {ScrollView, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { TextInput , Button } from 'react-native-paper';


export default function DreamList() {

  const [dreams, setDreams] = useState([]);
  const [researchText, setresearchText] = useState('');
  const [researchedDreams, setresearchedDreams] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await AsyncStorage.getItem('dreamFormDataArray');
          const dreamFormDataArray = data ? JSON.parse(data) : [];

          dreamFormDataArray.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
          });
  
          setDreams(dreamFormDataArray);
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
        }
      };
  
      fetchData();
    }, [])
  );

  const deleteDream = async (indexToDelete) => {
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      let dreamFormDataArray = existingData ? JSON.parse(existingData) : [];
  
      dreamFormDataArray.splice(indexToDelete, 1); // retire l'index
  
      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(dreamFormDataArray));
  
      setDreams(dreamFormDataArray);
  
      console.log(`Rêve à l'index ${indexToDelete} supprimé ✅`);
    } catch (error) {
      console.error('Erreur lors de la suppression du rêve:', error);
    }
  };
  

  useEffect(() => {
    const fetchFilteredDreams = () => {
      if (researchText.trim() === '') {
        setresearchedDreams(dreams); //si la recherche est vide, on affiche tout
        return;
      }
  
      const filtered = dreams.filter((dream) => {

        if (Array.isArray(dream.hashtags)) {
          return dream.hashtags.some(tag =>
            tag.toLowerCase().includes(researchText.trim().toLowerCase())
          );
        }
        return false;
      });
  
      setresearchedDreams(filtered);
    };
  
    fetchFilteredDreams();
  }, [researchText, dreams]);



  return (
    <ScrollView>
      <TextInput
        label="Recherche par mot clé"
        value={researchText}
        onChangeText={setresearchText}
        mode="outlined"
        style={{ marginTop: 10,
          marginBottom:10
        }}
      />

<Text style={styles.title}>Liste des Rêves :</Text>

{researchedDreams.map((dream, index) => (
  <View key={index} style={styles.dreamCard}>
    <Text style={styles.date}>
      📅 {dream.date}
    </Text>

    <Text style={styles.text}>
    📝 {dream.dreamText.length > 27 
        ? dream.dreamText.substring(0, 27) + '...' 
        : dream.dreamText}

    </Text>

    <Text style={styles.text}>
      🔮 {dream.isLucidDream ? 'Rêve : Lucide' : 'Rêve : Non Lucide'}
    </Text>

    <Text style={styles.text}>
      🧠 Avant : {dream.etatAvant} / Après : {dream.etatApres}
    </Text>

    <Text style={styles.text}>
      🌡️ Intensité : {parseFloat(dream.intensite).toFixed(2)} / 🔆 Clarté : {parseFloat(dream.clarte).toFixed(2)}
    </Text>
    

    {Array.isArray(dream.hashtags) && dream.hashtags.length > 0 ? (
      <Text style={styles.text}>
      🏷️ Mots clés : {dream.hashtags.join(' | ')}
      </Text>
    ) : (
      <Text style={styles.text}>
      🏷️ Aucun mot clé
      </Text>
    )}

    <Button 
      mode="text" 
      onPress={() => deleteDream(index)} 
      style={styles.deleteButton} 
      labelStyle={styles.deleteButtonText}
    >
      🗑️ Supprimer
    </Button>

  </View>
))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dreamText: {
    fontSize: 16,
    marginBottom: 4,
  },

  dreamCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  deleteButton: {
    backgroundColor: '#ff514d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'center', // pour que le bouton prenne juste la taille du contenu
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
  
});
