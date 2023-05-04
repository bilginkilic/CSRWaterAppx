import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const tips = [
  "Tip of the day 1: Take breaks regularly to avoid burnout.",
  "Tip of the day 2: Set small, achievable goals to boost motivation.",
  "Tip of the day 3: Track your progress to stay motivated and on track.",
];

const FeedScreen = () => {
  const [tip, setTip] = useState(tips[Math.floor(Math.random() * tips.length)]);

 
  const navigation = useNavigation();

  const handleMyTasksPress = () => {
    navigation.navigate('TaskToFinale');
  };

  const handleMyAchievementsPress = () => {
    navigation.navigate('MyAchivements');
  };

  return (


    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleMyTasksPress}
        >
          <Text style={styles.buttonText}>My Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleMyAchievementsPress}
        >
          <Text style={styles.buttonText}>My Achievements</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tipContainer}>
        <View style={styles.tipBubble}>
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      </View>
    </View>

 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#9de3a7',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#0e6645',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  tipContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Update this line
  },
  tipBubble: {
    backgroundColor: '#8ac6d1',
    borderRadius: 20,
    padding: 10,
    maxWidth: 250,
  },
  tipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default FeedScreen;
