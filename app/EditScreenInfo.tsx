// components/DreamEdit.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { RadioButton, TextInput, Button, Checkbox, Text } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from 'react-native-calendars';
import TagInputComponent from '../components/tag.input';
import RNPickerSelect from 'react-native-picker-select';
import {Slider} from '@miblanchard/react-native-slider';
import { useLocalSearchParams, router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function DreamEdit() {
  const { index } = useLocalSearchParams(); // récupérer l'index du rêve à modifier
  const [dreamData, setDreamData] = useState(null);

  const [dreamText, setDreamText] = useState('');
  const [isLucidDream, setIsLucidDream] = useState(false);
  const [day, setDay] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [radioBeforeValue, setRadioBeforeValue] = useState('normal');
  const [radioAfterValue, setRadioAfterValue] = useState('normal');
  const [clarte, setClarte] = useState(0);
  const [intensite, setIntensite] = useState(0);
  const [dreamType, setDreamType] = useState('ordinaire');

  useEffect(() => {
    const loadDream = async () => {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];

      const dream = formDataArray[index];

      if (dream) {
        setDreamData(dream);
        setDreamText(dream.dreamText);
        setIsLucidDream(dream.isLucidDream);
        setDay(dream.date);
        setHashtags(dream.hashtags || []);
        setRadioBeforeValue(dream.etatAvant);
        setRadioAfterValue(dream.etatApres);
        setClarte(dream.clarte);
        setIntensite(dream.intensite);
        setDreamType(dream.dreamType);
      }
    };

    loadDream();
  }, [index]);

  const handleDreamUpdate = async () => {
    const existingData = await AsyncStorage.getItem('dreamFormDataArray');
    const formDataArray = existingData ? JSON.parse(existingData) : [];

    if (formDataArray[index]) {
      formDataArray[index] = {
        dreamText,
        isLucidDream,
        date: day,
        hashtags,
        etatAvant: radioBeforeValue,
        etatApres: radioAfterValue,
        clarte,
        intensite,
        dreamType,
      };

      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
      console.log('Rêve modifié ✅');
      router.back(); // revenir à la liste après modification
    }
  };

  if (!dreamData) {
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>


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



      <RNPickerSelect
        onValueChange={(value) => setDreamType(value)}
        value={dreamType}
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
      <Button mode="contained" onPress={handleDreamUpdate}>
        Envoyer
      </Button>

    </View>

  </View>

  </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  </ScrollView>
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