import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalStorage } from './useLocalStorage';

const TaskOptions = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [answers, setAnswers] = useLocalStorage('answers', []);
  const [selectedTasks, setSelectedTasks] = useLocalStorage('selectedTasks', []);

  const tasks = answers.filter((answer) => answer.type === 'Task');

  const toggleTaskSelection = (taskId, task) => {
    const isSelected = selectedTasks.some((selectedTask) => selectedTask.question === task.question);
    if (isSelected) {
      showAlert();
    } else {
      setSelectedTasks((prevSelectedTasks) => [...prevSelectedTasks, task]);
      showAlert2();
    }
  };

  const addToTaskList = () => {
    // Perform any additional operations before adding tasks to the list
  };

  const showAlert = () => {
    Alert.alert('Duplicate Task', 'The task is already in the list.', [{ text: 'OK' }], { cancelable: false });
  };

  const showAlert2 = () => {
    Alert.alert('Success', 'The task has been added to the list.', [{ text: 'OK' }], { cancelable: false });
  };

  return (
    <View style={styles.container}>
      {tasks
        .filter((task) => task.category === categoryId)
        .map((task) => (
          <TouchableOpacity
            key={task.questionid}
            onPress={() => toggleTaskSelection(task.questionid, task)}
            style={[
              styles.taskItem,
              selectedTasks.some((selectedTask) => selectedTask.question === task.question) && styles.selectedTaskItem,
            ]}
          >
            <Text style={styles.taskName}>{task.task}</Text>
          </TouchableOpacity>
        ))}
      {tasks.filter((task) => task.category === categoryId).length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Horray, nothing to do here! 🎉</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskItem: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedTaskItem: {
    backgroundColor: '#b3d9ff', // Light blue color for selected tasks
  },
  taskName: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#888',
  },
});

export default TaskOptions;
