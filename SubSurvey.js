import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalStorage } from './useLocalStorage';

const SubSurvey = ({ navigation, route }) => {
  const  question  = route.params;
  const [selectedOption, setSelectedOption] = useState(null);
  
  const [answers, setAnswers] = useLocalStorage('answers', []);

  const [selectedTasks, setSelectedTasks] = useLocalStorage('selectedTasks', []);
 
  
  const handleOptionSelection = (opt) => {
    setSelectedOption(opt);
    setAnswers([
        ...answers,
        {
          questionid: question.id,
          question: question.text,
          answer: opt.text,
          saving: opt.valueSaving,
          total: opt.valueTotal,
          task: opt.task,
          type: opt.type,
          category: opt.category,
          completed: false,
        },
      ]);
      if (opt.type === 'Achievement') {
        setSelectedTasks((prevSelectedTasks) =>
          prevSelectedTasks.filter((task) => task.questionid !== question.id)
        );
      }
  };

  const handleCompleteSubSurvey = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOptionButton,
          ]}
          onPress={() => handleOptionSelection(option)}
        >
          <Text style={styles.optionText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={handleCompleteSubSurvey}
        disabled={!selectedOption}
      >
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#3498db', // Blue color for the selected option
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  completeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    backgroundColor: '#4caf50', // Green color for the complete button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubSurvey;
