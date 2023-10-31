import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { useLocalStorage } from './useLocalStorage';
import { useNavigation ,useFocusEffect} from '@react-navigation/native';
import { GlobalContext } from './GlobalContext';
 
const TaskToFinale = () => {
  const navigation = useNavigation();
  const { globalArray, setGlobalArray } = useContext(GlobalContext);

  const [selectedTasks, setSelectedTasks] = useLocalStorage('selectedTasks', []);
 
  const [questions, setQuestions] = useState([
    {
        id: 1,
        text: 'Do you use a dishwasher?',
        options: [
            { text: 'Yes', valueSaving: 111, valueTotal: 15, task: 'Well done for using the dishwasher!', category: 'Dishwashing', type: 'Achievement' },
            { text: 'No', valueSaving: 0, valueTotal: 126, task: 'Consider using a dishwasher.', category: 'Dishwashing', type: 'Task' },
        ]  ,
        trainingText: 'Hand washing dishes can use up to 5 times more water compared to using a dishwasher.',
        content: {
            message: 'Switch to a dishwasher and save both water and time!',
            image: 'URL_of_an_image_comparing_water_used_in_hand_washing_vs_dishwasher',
            video: 'URL_of_a_video_illustrating_the_benefits_of_a_dishwasher_over_hand_washing',
            additionalInfo: 'Dishwashers can also ensure a more hygienic clean, removing more bacteria and germs than hand washing.'
        }
    },
    {
        id: 2,
        text: 'Do you pre-rinse dishes before the dishwasher?',
        options: [
            { text: 'Yes', valueSaving: 0, valueTotal: 36, task: 'Do you need to rinse? Act accordingly!', category: 'Dishwashing', type: 'Task' },
            { text: 'No', valueSaving: 21, valueTotal: 15, task: 'Well done for saving water!', category: 'Dishwashing', type: 'Achievement' },
        ],
        trainingText: 'Pre-rinsing dishes may not always be necessary and can lead to a lot of water wastage.',
            content: {
                message: 'Modern dishwashers are designed to handle tough food residues. By skipping pre-rinsing, you could save gallons of water over a year!',
                image: 'URL_of_an_image_showing_dishes_before_and_after_dishwasher_without_pre-rinsing',
                video: 'URL_of_a_video_about_dishwasher_efficiency_and_pre-rinsing',
                additionalInfo: 'Before you rinse those dishes, think twice! Many times, simply scraping off excess food and loading them into the dishwasher is enough.'
            }
   },
    {
        id: 3,
        text: 'How full is your dishwasher before you run it?',
        options: [
            { text: 'Full', valueSaving: 11, valueTotal: 22, task: 'Well done for fully loading!', category: 'Dishwashing', type: 'Achievement' },
            { text: 'Half full', valueSaving: 0, valueTotal: 22, task: 'Did you know fully loading saves more water?', category: 'Dishwashing', type: 'Task' },
        ],
        trainingText: 'Maximizing the load of your dishwasher before running can lead to significant water savings over time.',
        content: {
            message: 'Make every drop count! Wait a bit longer, and ensure your dishwasher is full before starting a cycle.',
            image: 'URL_of_an_image_highlighting_water_wastage_of_half_loaded_dishwashers',
            video: 'URL_of_a_video_on_tips_to_load_dishwashers_efficiently',
            additionalInfo: 'A half-loaded dishwasher uses nearly the same amount of water as a full load. Save water and energy by ensuring maximum load before washing.'
        }
      },
    {
        id: 4,
        text: 'Are your taps low-flow?',
        options: [
            { text: 'Yes', valueSaving: 44, valueTotal: 76, task: 'Low-flow taps save water. Well done!', category: 'Plumbing', type: 'Achievement' },
            { text: 'No', valueSaving: 0, valueTotal: 120, task: 'Consider low-flow taps to save water.', category: 'Plumbing', type: 'Task' },
        ],
        trainingText: 'Regular taps can use up to twice as much water as their low-flow counterparts. Consider making the switch!',
        content: {
            message: 'Every drop counts! By switching to low-flow taps, you can play a vital role in conserving water.',
            image: 'URL_of_an_image_highlighting_water_wastage_with_regular_taps',
            video: 'URL_of_a_video_showing_how_to_install_and_use_low_flow_taps',
            additionalInfo: 'Upgrading to low-flow taps is a cost-effective way to conserve water without compromising on functionality. Plus, they can help you save money in the long run.'
        }
    },
    {
        id: 5,
        text: 'How long is your shower time?',
        options: [
            { text: 'Under 5 mins', valueSaving: 160, valueTotal: 70, task: 'Excellent for quick showers!', category: 'Shower', type: 'Achievement' },
            { text: '5 - 10 mins', valueSaving: 80, valueTotal: 150, task: 'Shorter showers save more water.', category: 'Shower', type: 'Task' },
            { text: '11 - 15 mins', valueSaving: -20, valueTotal: 250, task: 'Consider reducing your shower time.', category: 'Shower', type: 'Task' },
            { text: 'Over 15 mins', valueSaving: -220, valueTotal: 450, task: 'Shorten your showers to save water.', category: 'Shower', type: 'Task' },
            { text: 'Use a bucket', valueSaving: 210, valueTotal: 20, task: 'Using a bucket is efficient. Well done!', category: 'Shower', type: 'Achievement' }
        ],
        trainingText: 'Every additional minute in the shower uses up to 5 gallons of water.',
        content: {
            message: 'Time to reflect! Can you cut down a few minutes?',
            image: 'URL_of_an_image_showing_water_flow_with_a_timer',
            video: 'URL_of_a_video_on_the_environmental_impact_of_long_showers',
            additionalInfo: 'By reducing your shower time, you not only save water but also contribute to a healthier environment.'
        }
    },
    {
        id: 6,
        text: 'How full is your laundry machine when washing?',
        options: [
            { text: 'Full', valueSaving: 90, valueTotal: 180, task: 'Full loads save water. Good job!', category: 'Laundry', type: 'Achievement' },
            { text: 'Half full', valueSaving: 0, valueTotal: 180, task: 'Consider full loads to save water.', category: 'Laundry', type: 'Task' },
        ],
        trainingText: 'Washing half loads frequently can lead to more water usage over time.',
        content: {
            message: 'Plan ahead! Combine your laundry to make full loads and reduce water wastage.',
            image: 'URL_of_an_image_showing_a_half_full_laundry_machine',
            video: 'URL_of_a_video_giving_tips_on_optimizing_laundry_loads',
            additionalInfo: 'Running your machine with full loads can also extend its life and reduce wear and tear.'
        }
    },
    {
        id: 7,
        text: 'Do you shut the tap while brushing teeth?',
        options: [
            { text: 'Yes', valueSaving: 2, valueTotal: 2, task: 'Excellent for conserving water!', category: 'Daily activities', type: 'Achievement' },
            { text: 'No', valueSaving: 0, valueTotal: 4, task: 'Turn off the tap while brushing.', category: 'Daily activities', type: 'Task' },
        ],
        trainingText: 'Washing half loads frequently can lead to more water usage over time.',
        content: {
            message: 'Plan ahead! Combine your laundry to make full loads and reduce water wastage.',
            image: 'URL_of_an_image_showing_a_half_full_laundry_machine',
            video: 'URL_of_a_video_giving_tips_on_optimizing_laundry_loads',
            additionalInfo: 'Running your machine with full loads can also extend its life and reduce wear and tear.'
        }
    },
    {
        id: 8,
        text: 'Any leaky taps or pipes at home?',
        options: [
            { text: 'Yes', valueSaving: 0, valueTotal: 32, task: 'Fix leaky faucets to conserve water.', category: 'Plumbing', type: 'Task' },
            { text: 'No', valueSaving: 32, valueTotal: 0, task: 'Good job on maintaining your plumbing!', category: 'Plumbing', type: 'Achievement' },
        ],
        trainingText: 'Maintaining your plumbing system ensures no wastage and saves money.',
        content: {
            message: 'Way to go! Continue regular checks to keep your plumbing in top shape.',
            image: 'URL_of_an_image_showing_well_maintained_plumbing',
            video: 'URL_of_a_video_on_the_importance_of_regular_plumbing_checkups',
            additionalInfo: 'Regular plumbing maintenance not only conserves water but also extends the lifespan of your fixtures.'
        }
    },
    {
        id: 9,
        text: 'Do you own a car?',
        options: [
            { text: 'No', valueSaving: 0, valueTotal: 0 },
            { text: 'Yes', valueSaving: 0, valueTotal: 0 },
        ],
    },
    {
        id: 10,
        text: 'How do you wash your car?',
        options: [
            { text: 'Yourself', valueSaving: 0, valueTotal: 200, task: 'Consider more efficient methods to save water.', category: 'Car owners', type: 'Task' },
            { text: 'A professional car cleaning service', valueSaving: 120, valueTotal: 80, task: 'Pressure washing is efficient. Well done!', category: 'Car owners', type: 'Achievement' },
        ],
        trainingText: 'Washing your car by yourself can use up to 200 gallons of water. More efficient methods can drastically reduce water usage.',
        content: {
            message: 'Save water while giving your car a sparkle! Consider alternative washing methods.',
            image: 'URL_of_an_image_showing_high_water_usage_while_washing_car',
            video: 'URL_of_a_video_on_efficient_car_washing_techniques',
            additionalInfo: 'Using a hose to wash your car can waste significant amounts of water. Opt for waterless car wash products or use a bucket to reduce water usage.'
        }
    }
]);

 
  const handleTaskSelection = (task) => {

 
    const taksQuestion = questions.find((answer) => answer.id == task.questionid);
 
 
    navigation.navigate('MiddleScreen',taksQuestion);
    
  };

  
  
  useFocusEffect(
    React.useCallback(() => {
      //console.log("welcome back cr",globalArray)
      // Update selectedTasks whenever the screen gains focus
      setSelectedTasks(globalArray);
    }, [setSelectedTasks,globalArray])
  );


  
  return (
    
      <ScrollView contentContainerStyle={styles.container}>
      
      { selectedTasks.length > 0 ? ( selectedTasks.map((task) => (
        <TouchableOpacity
          key={task.questionid}
          style={[
            styles.task
          //  task.completed && styles.completedTask,
          ]}
          onPress={() => handleTaskSelection(task)}
        >
          <Text style={styles.taskName}>{task.task}</Text>
          <Text style={styles.taskCategory}>{task.category}</Text>
        </TouchableOpacity>
      ))):(

        <Text style={styles.emptyText}>Horray, nothing to do here! 🎉 If you want to do more go to tasks to select more tasks</Text>
      )}
 
 </ScrollView>
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
  subPageContainer: {
    marginTop: 20,
  },
  subPageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#3498db',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskToFinale;
