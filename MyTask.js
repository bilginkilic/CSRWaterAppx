import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tasks from './TasksOrjinal';
import { useLocalStorage } from './useLocalStorage';
const MyTaskScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [answers, setAnswers] = useLocalStorage('answers', []);
  const remainingTaskList = answers.filter((answer) => answer.type === 'Task' && answer.completed == false);
  const handleSelectCategory = (category) => {
    navigation.navigate('TaskOptions', { categoryId: category });
    setSelectedCategory(category);
  };

  useEffect(() => {
     
  }); 

  const renderTaskCategories = () => {
    return Array.from(new Set(tasks.map((task) => task.category))).map((category) => (
      <TouchableOpacity
        key={category}
        style={[
          styles.button,
          { backgroundColor: category === selectedCategory ? '#3498db' : 'grey' },
        ]}
        onPress={() => handleSelectCategory(category)}
      >
        <ImageBackground
          source={getImageForCategory(category)}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <Text style={styles.buttonText}>{category}</Text>
        </ImageBackground>
      </TouchableOpacity>
    ));
  };

  const renderNoTasksMessage = () => {
    return (
      <View style={styles.noTasksContainer}>
        <Text style={styles.noTasksText}>Congratulations!!</Text>
        <Text style={styles.noTasksText}>You completed fundamental tasks!</Text>
        <Text style={styles.noTasksText}>You are a ‘Role Model’ for Mufg!</Text>
        <Text style={styles.noTasksText}>Stay in touch for upcoming challenges…</Text>
      </View>
    );
  };

  // Helper function to get the image for each category
const getImageForCategory = (category) => {
  switch (category) {
    case 'Dishwashing':
      return require('./images/category/dishwashing.jpg');
    case 'Plumbing':
      return require('./images/category/plumbing.jpeg');
    case 'Shower':
      return require('./images/category/shower.jpg');
      case 'Laundry':
        return require('./images/category/laundry.jpg');
      case 'Daily activities':
        return require('./images/category/dailyactivities.jpeg');
      case 'Car owners':
        return require('./images/category/carowners.jpg');
    // Add more cases for other categories and their respective images
    default:
      return require('./images/category/carowners.jpg'); // Default image if category not found
  }
};

  return (
    <View style={styles.container}>
      {remainingTaskList.length > 0 ? (
        <View style={styles.buttonContainer}>{renderTaskCategories()}</View>
      ) : (
        renderNoTasksMessage()
      )}
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
    borderRadius: 5,
    marginBottom: 10,
    width: '48%',
    aspectRatio: 1, // Maintain the aspect ratio of the button
    overflow: 'hidden', // Ensure the image doesn't exceed the button boundaries
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18, // Adjust the font size to your preference
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Add padding to make the image more visible
  },
  image: {
    resizeMode: 'cover',
    opacity: 0.7, // Adjust the opacity to your preference
    width: '100%',
    height: '100%',
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default MyTaskScreen;
