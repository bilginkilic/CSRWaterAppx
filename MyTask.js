import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tasks from './TasksOrjinal';

const MyTaskScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    navigation.navigate('TaskOptions', { categoryId: category });
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {Array.from(new Set(tasks.map((task) => task.category))).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.button,
              { backgroundColor: category === selectedCategory ? '#3498db': 'grey' },
            ]}
            onPress={() => handleSelectCategory(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MyTaskScreen;
