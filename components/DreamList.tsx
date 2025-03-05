// components/DreamList.tsx

import React, { useCallback, useEffect, useState } from 'react';
import {ScrollView, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { TextInput } from 'react-native-paper';


export default function DreamList() {

  const [dreams, setDreams] = useState([]);
  const [researchText, setresearchText] = useState('');
  const [researchedDreams, setresearchedDreams] = useState([]);

  const findHashtagIdByLabel = async (hashtag) => {
    try {
      const existingDreams = await AsyncStorage.getItem('dreamFormDataArray');
      let dreamsData = existingDreams ? JSON.parse(existingDreams) : [];

      for (let dream of dreamsData) {
        for (let hashtagKey in dream.hashtags) {
          const hashtagStored = dream.hashtags[hashtagKey]; // Récupère l'objet du hashtag stocké

          if (hashtagStored.label === hashtag) {
            // Si le hashtag est trouvé, renvoie son ID
            return hashtagStored.id;
          }
        }
      }

      // Si le hashtag n'existe pas, crée un nouvel ID
      const newId = `hashtag-${Math.random().toString(36).substr(2, 9)}`;
      return newId;

    } catch (error) {
      console.error('Erreur lors de la gestion des hashtags:', error);
      return null;
    }
  };


  // Ce useEffect est executé a chaque fois que le composant est affiché
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await AsyncStorage.getItem('dreamFormDataArray');
          const dreamFormDataArray = data ? JSON.parse(data) : [];
          setDreams(dreamFormDataArray);
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
        }
      };
  
      fetchData();
  
      return () => {
        console.log("Nettoyage lorsque l'écran perd le focus.");
      };
    }, [])
  );
  

   useEffect( () => {
        const fetchFilteredDreams = async () => {
            if (!researchText) {
                setresearchedDreams(dreams)
                return
            }
            const search_hashtag_id = await findHashtagIdByLabel(researchText)

            const results = dreams.filter((dream) => {
                if (search_hashtag_id) {
                    const dream_hashtags = dream.hashtags.map((hashtag) => {
                        return hashtag.id
                    })
                    if (researchText === "" || dream_hashtags.includes(search_hashtag_id)) {
                        return dream
                    }
                }
            });

            setresearchedDreams(results);
            return
        }
        fetchFilteredDreams()
    }, [researchText, dreams]);



  return (
    <ScrollView>
      <TextInput
        label="Rechercher un rêve avec un hashtag"
        value={researchText}
        onChangeText={setresearchText}
        mode="outlined"
      />

      <Text style={styles.title}>Liste des Rêves :</Text>
      {dreams.map((dream, index) => (
        <Text key={index} style={styles.dreamText}>
          {dream.dreamText} - {dream.isLucidDream ? 'Lucide' : 'Non Lucide'} - {dream.todayDate.dateString}
          <br/>
          Hashtags:
          <br/>
          1. {dream.hashtags[0].id} - {dream.hashtags[0].label}
          <br/>
          2. {dream.hashtags[1].id} - {dream.hashtags[1].label}
          <br/>
          3. {dream.hashtags[2].id} - {dream.hashtags[2].label}
        </Text>
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
});
