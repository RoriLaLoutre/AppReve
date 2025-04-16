// components/DreamForm.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import { RadioButton, TextInput, Button, Checkbox, Text } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import  TagInputComponent  from '../components/tag.input';
import RNPickerSelect from 'react-native-picker-select';
import {Slider} from '@miblanchard/react-native-slider';


const { width } = Dimensions.get('window');

export default function DreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [isLucidDream, setIsLucidDream] = useState(false);
  const [day, setDay] = useState('');
  // const [hashtag1, setHashtag1] = useState('');
  // const [hashtag2, setHashtag2] = useState('');
  // const [hashtag3, setHashtag3] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [radioBeforeValue, setRadioBeforeValue] = useState('normal');
  const [radioAfterValue, setRadioAfterValue] = useState('normal');
  const [clarte, setClarte] = useState(0);
  const [intensite, setIntensite] = useState(0);


  // const handleDreamSubmission = async () => {

  //   try {
  //     // Récupérer le tableau actuel depuis AsyncStorage
  //     const existingData = await AsyncStorage.getItem('dreamFormDataArray');
  //     const formDataArray = existingData ? JSON.parse(existingData) : [];

  //     // const hashtag1Id = await findHashtagIdByLabel(hashtag1);
  //     // const hashtag2Id = await findHashtagIdByLabel(hashtag2);
  //     // const hashtag3Id = await findHashtagIdByLabel(hashtag3);


  //     // Ajouter le nouveau formulaire au tableau
  //     formDataArray.push({
  //       dreamText: dreamText,
  //       isLucidDream: isLucidDream,
  //       todayDate: day,
  //       hashtags: [
  //         // { id: hashtag1Id, label: hashtag1 },
  //         // { id: hashtag2Id, label: hashtag2 },
  //         // { id: hashtag3Id, label: hashtag3 },
  //       ],
  //     });

  //     // Sauvegarder le tableau mis à jour dans AsyncStorage
  //     await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));

  //     console.log(
  //       'AsyncStorage: ',
  //       AsyncStorage.getItem('dreamFormDataArray')
  //     );

  //   } catch (error) {

  //     console.error('Erreur lors de la sauvegarde des données:', error);
  //   }

  //   setDreamText('');
  //   setIsLucidDream(false);
  //   // setHashtag1('');
  //   // setHashtag2('');
  //   // setHashtag3('');
  // };

  const handleDreamSubmission = async () => {
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];
  
      if (day === "") {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // date du jour au format YYYY-MM-DD
        setDay(formattedDate );
      }
      const newDream = {
        dreamText,
        isLucidDream,
        date: day,
        hashtags: hashtags, // liste
        etatAvant: radioBeforeValue,
        etatApres: radioAfterValue,
        intensite,
        clarte,
      };
  
      formDataArray.push(newDream);
  
      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
  
      // Affichage dans la console pour debug
      console.log('Données sauvegardées :', newDream);
  
      // Reset des champs
      setDreamText('');
      setIsLucidDream(false);
      setHashtags([]);
      setDay('');
      setRadioBeforeValue('normal');
      setRadioAfterValue('normal');
      setIntensite(0);
      setClarte(0);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        label="Racontez votre rêve"
        value={dreamText}
        onChangeText={(text) => setDreamText(text)}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={[styles.input, { width: width * 0.8, alignSelf: 'center' } , styles.button]}
      />

      {/* <TextInput
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
      /> */}

      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        placeholder={{ label: 'Sélectionner un type de rêve', value: "ordinaire" }}
        items={[
          { label: 'Cauchemar', value: 'cauchemar' },
          { label: 'Rêve ordinaire', value: 'ordinaire' },
          { label: 'Rêve agréable', value: 'agreable' },
        ]}
      />


    <View style={styles.row}>
      <RadioButton.Group onValueChange={newValue => setRadioBeforeValue(newValue)} value={radioBeforeValue}>
      <Text style={styles.smallfont}>Votre état avant le rêve : </Text>
        <View>
          <Text style={styles.smallfont}>bien 🙂</Text>
          <RadioButton color='#4CAF50' value="bien" />
        </View>
        <View>
          <Text style={styles.smallfont}>normal 😐</Text>
          <RadioButton value="normal" />
        </View>
        <View>
          <Text style={styles.smallfont}>mal 🙁</Text>
          <RadioButton color="#FF6347" value="mal" />
        </View>
      </RadioButton.Group>

      <RadioButton.Group onValueChange={newValue => setRadioAfterValue(newValue)} value={radioAfterValue}>
      <Text style={styles.smallfont}>Votre état après le rêve : </Text>
        <View>
          <Text style={styles.smallfont}>bien 🙂</Text>
          <RadioButton color='#4CAF50' value="bien" />
        </View>
        <View>
          <Text style={styles.smallfont}>normal 😐</Text>
          <RadioButton value="normal" />
        </View>
        <View>
          <Text style={styles.smallfont}>mal 🙁</Text>
          <RadioButton color="#FF6347" value="mal" />
        </View>
      </RadioButton.Group>
    </View>

    
    <View style={styles.container}>
      <Text>Intensité du rêve</Text>
      <Slider
        value={intensite}
        onValueChange={newValue => setIntensite(newValue[0])}
        minimumValue={0}
        maximumValue={10}
        step={0.05}
        thumbTintColor='#FF6347'
      />
    </View>

    <View style={styles.container}>
      <Text>Clarté du rêve</Text>
      <Slider
        value={clarte}
        onValueChange={newValue => setClarte(newValue[0])}
        minimumValue={0}
        maximumValue={10}
        step={0.05}
        thumbTintColor='#FF6347'
      />
    </View>

    <View>
      <Text>Mots clés (lieu, personnes, situation etc...)</Text>
      <TagInputComponent
        tags={hashtags}
        setTags={setHashtags}
      />
    </View>

    <View style={styles.checkboxContainer}>
      <Checkbox.Item
        label="Rêve Lucide"
        status={isLucidDream ? 'checked' : 'unchecked'}
        onPress={() => setIsLucidDream(!isLucidDream)
        }
    />
    </View>

    <View>
      <Calendar
        onDayPress={(day) => {setDay(day.dateString);
        }}
        style={styles.borderbox}
      />
    </View>

    <View style={styles.button}>
      <Button mode="contained" onPress={handleDreamSubmission}>
        Envoyer
      </Button>
    </View>

  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
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
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    marginTop: 16,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  color:{
    color: '#fff',
  },
  smallfont:{
    fontSize: 10,
  },
  borderbox:{
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    boxShadow : '0 4px 8px rgba(0, 0, 0, 0.2)',
  }



  
});



  