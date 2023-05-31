import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalStorage } from './useLocalStorage';

const TaskOptions = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [answers, setAnswers] = useLocalStorage('answers', []);
  const [selectedTasks, setSelectedTasks] = useLocalStorage('selectedTasks', []);

  const tasks = answers.filter((answer) => answer.type === 'Task');

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(taskId)) {
        return prevSelectedTasks.filter((id) => id !== taskId);
      } else {
        return [...prevSelectedTasks, taskId];
      }
    });
  };

  const addToTaskList = () => {
    const selectedTaskObjects = tasks.filter((task) => selectedTasks.includes(task.task));
    setSelectedTasks(selectedTaskObjects);
    showAlert();
  };

  const showAlert = () => {
    Alert.alert('Success', 'The task has been added to the list.', [{ text: 'OK' }], { cancelable: false });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tasks</Text>
      {tasks
        .filter((task) => task.category === categoryId)
        .map((task) => (
          <TouchableOpacity
            key={task.id}
            onPress={() => toggleTaskSelection(task.task)}
            style={[
              styles.taskItem,
              selectedTasks.includes(task.task) && styles.selectedTaskItem,
            ]}
          >
            <Text style={styles.taskName}>{task.task}</Text>
          </TouchableOpacity>
        ))}
      <TouchableOpacity onPress={addToTaskList} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Task List</Text>
      </TouchableOpacity>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  addButton: {
    marginTop: 16,
    backgroundColor: '#4caf50', // Green color for the add button
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskOptions;
