import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalStorage } from './useLocalStorage';

const MyAchivements = () => {
  const [answers, setAnswers] = useLocalStorage('answers', []);

  // Filter the answers array to get only the achievements
  const achievements = answers.filter((answer) => answer.type === 'Achievement');
console.log(answers)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Achievements </Text>
      {achievements.map((achievement, index) => (
        <View key={index} style={styles.task}>
          <Text style={styles.taskName}>{achievement.task}</Text>
          <Text style={styles.taskCategory}>{achievement.category}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  task: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskCategory: {
    fontSize: 16,
    color: '#888',
  },
});

export default MyAchivements;
