import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';
import { useLocalStorage } from './useLocalStorage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext';
function ProfileScreen() {
  const { signOut } = React.useContext(AuthContext);
 // const [answers, setAnswers] = useLocalStorage('answers', []);
 const { answers, setAnswers } = useContext(GlobalContext);
  const [savingValue, setSavingValue] = useLocalStorage('savingValue', 0);
  const [totalValue, setTotalValue] = useLocalStorage('totalValue', 0);

  const [currentSavingValue, setcurrentSavingValue] = useState('currentSavingValue', 0);
  const [currentTotalValue, setcurrentTotalValue] = useState('currentTotalValue', 0);
  const [currentSavingValueText, setcurrentSavingValueText] = useState('currentSavingValueText', '');
  const [currentTotalValueText, setcurrentTotalValueText] = useState('currentTotalValueText', '');

  const [username, setUsername, clearStorage, showAllLocalStorage] = useLocalStorage('username', '');

 


  const calculateValues = () => {

    let currentTotalValue = 0;
    let currentSavingValue = 0;

     answers.forEach((answer) => {
      currentTotalValue += answer.total;
      currentSavingValue += answer.saving;
    });

    setcurrentTotalValue(currentTotalValue);
    setcurrentSavingValue(currentSavingValue);


    let comparisonText = '';
    console.log(currentSavingValue)
    console.log(savingValue)
    if (currentSavingValue > savingValue && savingValue > 0 ) {
      let compSaving = (currentSavingValue-savingValue) / savingValue * 100;
      comparisonText = 'You have increased saved water by !' + compSaving.toFixed(2) + "%";
      setcurrentSavingValueText(comparisonText)
    } else {
      setcurrentSavingValueText('')
    }

    console.log(currentTotalValue)
    console.log(totalValue)
    if (currentTotalValue < totalValue) {
      let compTotal = (totalValue-currentTotalValue) / totalValue * 100;
      comparisonText = 'You have decreased water footprint by !' + compTotal.toFixed(2) + "%";
      setcurrentTotalValueText(comparisonText)
    } else {
      setcurrentTotalValueText('')
    }

    console.log(comparisonText);
  };

  useEffect(() => {
    console.log("maximus XF")
    calculateValues();
  }); 

  useFocusEffect(
    React.useCallback(() => {
      console.log("maximus XR")
      calculateValues();
    })
  );

 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hi, Welcome</Text>
        <Text style={styles.username}>{username}!</Text>
      </View>

      <View style={styles.waterDropContainer}>
        <Image source={require('./images/category/drop.png')} style={styles.waterDropImage} />

      </View>

      <View style={styles.infoContainer}>

      {currentSavingValueText !== '' ? (<>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>You saved</Text>
          <Text style={styles.infoValue}>{currentSavingValue} L</Text>
          <Text style={styles.infoText}>water!</Text>
        </View>

         </>) : (<>
          <View style={styles.infoRow}>
          <Text style={styles.infoText}>You saved</Text>
          <Text style={styles.infoValue}>{savingValue} L</Text>
          <Text style={styles.infoText}>water!</Text>
        </View></>)}


        {currentTotalValueText !== '' ? (<> 
     
          <View style={styles.infoRow}>
          <Text style={styles.infoText}>Your water footprint</Text>
          <Text style={styles.infoValue}>{currentTotalValue} L!</Text>
        </View>
           </>) : (<>
                
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Your water footprint</Text>
          <Text style={styles.infoValue}>{totalValue} L!</Text>
        </View>
           
           </>)}

  
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Istanbul dam fill rate </Text>
          <Text style={styles.infoValue}>95%</Text>
        </View>
        {currentSavingValueText !== '' ? (<><View style={styles.infoRow}>
          <Text style={styles.infoText}>{currentSavingValueText} </Text>

        </View>
         </>) : (<></>)}
        {currentTotalValueText !== '' ? (<> 
          <View style={styles.infoRow}>

            <Text style={styles.infoText}>{currentTotalValueText} </Text>
          </View></>) : (<></>)}
      </View>


      <Text style={styles.infoText}>Your answers are updated. {answers.length} </Text>

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  waterDropContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  waterDropImage: {
    width: 120,
    height: 120,
  },
  savingValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  infoContainer: {
    marginBottom: 30,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#666',
    marginRight: 10,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  signOutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  signOutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileScreen;
