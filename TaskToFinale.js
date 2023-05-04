import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalStorage } from './useLocalStorage';

const TaskToFinale = () => {
  const [selectedTasks, setSelectedTasks] = useLocalStorage('selectedTasks', []);

  const handleTaskSelection = (task) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.some((selectedTask) => selectedTask.questionid === task.questionid)) {
        return prevSelectedTasks ;//.filter((selectedTask) => selectedTask.questionid !== task.questionid);
      } else {
        return [...prevSelectedTasks, task];
      }
    });
  };

  const handleCompleteTasks = () => {
    setSelectedTasks((prevSelectedTasks) => {
      return prevSelectedTasks.map((task) => {
        if (selectedTasks.some((selectedTask) => selectedTask.task === task.task)) {
          return { ...task, completed: true };
        }
        return task;
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks to Complete</Text>
      {selectedTasks.map((task) => (
        <TouchableOpacity
          key={task.questionid}
          style={[
            styles.task,
            task.completed && styles.completedTask,
          ]}
          onPress={() => handleTaskSelection(task)}
        >
          <Text style={styles.taskName}>{task.task}</Text>
          <Text style={styles.taskCategory}>{task.category}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={handleCompleteTasks}
        disabled={selectedTasks.length === 0}
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
  completedTask: {
    backgroundColor: '#c8f7c5', // Light green color for completed task
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
  completeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: '#4caf50', // Green color for the complete button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskToFinale;
