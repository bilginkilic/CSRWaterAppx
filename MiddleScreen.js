import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MiddleScreen = ({ navigation ,route}) => {

  
        const taksQuestion = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.navigate('SubSurvey',taksQuestion); // This assumes you'll navigate to SubSurvey after this.
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{taksQuestion.trainingText}</Text>
      </View>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Text style={styles.buttonText}>Give me time</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.buttonText}>Continue to pledge the task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   
    justifyContent: 'flex-start', // Align to the top
    padding: 20
  },
  infoBox: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20
  },
  infoText: {
    fontSize: 16,
    color: '#333'
  },
  goBackButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center'
  },
  continueButton: {
    padding: 10,
    backgroundColor: '#87CEEB',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default MiddleScreen;
