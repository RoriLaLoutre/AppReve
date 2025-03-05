// components/DreamForm.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const { width } = Dimensions.get('window');

export default function DreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [isLucidDream, setIsLucidDream] = useState(false);
  const [day, setDay] = useState('');
  const [hashtag1, setHashtag1] = useState('');
  const [hashtag2, setHashtag2] = useState('');
  const [hashtag3, setHashtag3] = useState('');


  const handleDreamSubmission = async () => {

    try {
      // Récupérer le tableau actuel depuis AsyncStorage
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];

      const hashtag1Id = await findHashtagIdByLabel(hashtag1);
      const hashtag2Id = await findHashtagIdByLabel(hashtag2);
      const hashtag3Id = await findHashtagIdByLabel(hashtag3);


      // Ajouter le nouveau formulaire au tableau
      formDataArray.push({
        dreamText: dreamText,
        isLucidDream: isLucidDream,
        todayDate: day,
        hashtags: [
          { id: hashtag1Id, label: hashtag1 },
          { id: hashtag2Id, label: hashtag2 },
          { id: hashtag3Id, label: hashtag3 },
        ],
      });

      // Sauvegarder le tableau mis à jour dans AsyncStorage
      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));

      console.log(
        'AsyncStorage: ',
        AsyncStorage.getItem('dreamFormDataArray')
      );

    } catch (error) {

      console.error('Erreur lors de la sauvegarde des données:', error);
    }

    setDreamText('');
    setIsLucidDream(false);
    setHashtag1('');
    setHashtag2('');
    setHashtag3('');
  };


  return (
    <View style={styles.container}>

      <TextInput
        label="Rêve"
        value={dreamText}
        onChangeText={(text) => setDreamText(text)}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
      />

      <TextInput
        label="Hashtag 1"
        value={hashtag1}
        onChangeText={(hashtag1) => setHashtag1(hashtag1)}
        mode="outlined"
        style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
      />

      <TextInput
        label="Hashtag 2"
        value={hashtag2}
        onChangeText={(hashtag2) => setHashtag2(hashtag2)}
        mode="outlined"
        style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
      />

      <TextInput
        label="Hashtag 3"
        value={hashtag3}
        onChangeText={(hashtag3) => setHashtag3(hashtag3)}
        mode="outlined"
        style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          label="Rêve Lucide"
          status={isLucidDream ? 'checked' : 'unchecked'}
          onPress={() => setIsLucidDream(!isLucidDream)}
        />
      </View>
      <Calendar
          onDayPress={(day) => {setDay(day)
            console.log(day.dateString);
          }}
      />
      <Button mode="contained" onPress={handleDreamSubmission}>
      Envoyer
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

  