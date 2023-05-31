import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalStorage } from './useLocalStorage';
import { useNavigation } from '@react-navigation/native';
const TaskToFinale = () => {
  const navigation = useNavigation();
  const [selectedTasks, setSelectedTasks] = useLocalStorage('selectedTasks', []);
  const [referringQuestion, setReferringQuestion] = useLocalStorage('referringQuestion',[])
  const [questionsx, setQuestionsx] = useState(
  [
    {
    id:1,
    text: 'Do you use a dishwasher to wash your dishes?',
    options: [
        { text: 'Yes', valueSaving: 111 ,valueTotal:15 , task:'Always washing in dishwasher, congratulations!' , category:'Dishwashing' , type:'Achievement'},
        { text: 'No', valueSaving: 0 ,valueTotal:126, task:'Need to wash in dishwasher, take the necessary action! ', category:'Dishwashing' , type:'Task' },
    ],
},
{
    id:2,
    text: 'Do you rinse the dishes before putting them in the machine?',
    options: [
        { text: 'Yes', valueSaving: 21 ,valueTotal:36, task:'Do not waste water for rinsing, congratulations!', category:'Dishwashing' , type:'Achievement'},
        { text: 'No', valueSaving: 0 ,valueTotal:15,task:'Do you really need to rinse, take the necessary action!', category:'Dishwashing' , type:'Task'},
    ],
},
{
    id:3,
    text: 'How do you run your dishwasher, full or half full?',
    options: [
        { text: 'Full', valueSaving: 11 ,valueTotal:22 , task:'You made a significant effect by full loading of your dishwasher, congratulations!',category:'Dishwashing', type:'Achievement' },
        { text: 'Half full', valueSaving: 0,valueTotal:22 ,task:'Do you know full loading your dishwasher saves 11 liters for each run, take the necessary action! ', category:'Dishwashing' , type:'Task'},
    ],
},
{
    id:4,
    text: 'Do the faucets in your house have slow-flows? (for 5 mins shower, 1  flush)',
    options: [
        { text: 'Yes', valueSaving: 44 ,valueTotal:76 , task:'You made a significant effect by full loading of your dishwasher, congratulations!', category:'Plumbing' ,type:'Achievement'  },
        { text: 'No', valueSaving: 0 ,valueTotal:120,task:'You can save water with an easy arrangement of slow-flows, take the necessary action! ', category:'Plumbing' , type:'Task'},
    ],
},
{
    id:5,
    text: 'How many minutes you take a shower?',
    options: [
        { text: 'Under 5 mins', valueSaving: 160,valueTotal:70 ,  task:'Bucket usage or 5 minutes shower is the target and it is a hard challenge, congratulations!', category:'Shower' ,type:'Achievement' },
        { text: '5 - 10 mins', valueSaving: 80 ,valueTotal:150 ,task:'Decreasing your shower duration makes a significant difference, take the necessary action! ', category:'Shower' , type:'Task'},
        { text: '11 - 15 mins', valueSaving: -20 ,valueTotal:250 ,task:'Decreasing your shower duration makes a significant difference, take the necessary action! ', category:'Shower' , type:'Task'},
        { text: 'Over 15 mins', valueSaving: -220 ,valueTotal:450 ,task:'Decreasing your shower duration makes a significant difference, take the necessary action! ', category:'Shower' , type:'Task'},
        { text: 'Use a bucket', valueSaving: 210 ,valueTotal:20, task:'Bucket usage or 5 minutes shower is the target and it is a hard challenge, congratulations!', category:'Shower' ,type:'Achievement'  } 
    ],
},
{
    id:6,
    text: 'How do you laundry, full or half full?',
    options: [
        { text: 'Full', valueSaving: 90 ,valueTotal:180  ,  task:'By full loading your laundry you save 90 liters water , congratulations!', category:'Laundry' ,type:'Achievement'},
        { text: 'Half full', valueSaving: 0 ,valueTotal:180 ,task:'Turn off the water and save 10 liters more for your each brush, take the necessary action! ', category:'Laundry' , type:'Task'},
    ],
},
{
    id:7,
    text: 'Do you turn off the water while you are brushing?',
    options: [
        { text: 'Yes', valueSaving: 2,valueTotal:2  ,  task:'You saved 10 liters for your each brush , congratulations!', category:'Daily activities' ,type:'Achievement'},
        { text: 'No', valueSaving: 0,valueTotal:4 ,task:'Decreasing your shower duration makes a significant difference, take the necessary action! ', category:'Daily activities' , type:'Task'},
    ],
},
{
    id:8,
    text: 'Does your faucets/pipes leak?',
    options: [
        { text: 'Yes', valueSaving: 0 ,valueTotal:32 ,  task:'You fixed your leaky faucets, congratulations!', category:'Plumbing' ,type:'Achievement'},
        { text: 'No', valueSaving: 32 ,valueTotal:0,task:'32 liters more with only one leaky faucet, take the necessary action!  ', category:'Plumbing' , type:'Task' },
    ],
},
{
    id:9,
    text: 'Do you have car?',
    options: [
        { text: 'No', valueSaving: 0 ,valueTotal:0 },
        
        { text: 'Yes', valueSaving: 0 ,valueTotal:0  },
     ]

},
{
    id:10,
    text: 'Do you wash yourself or do you use pressure washer system?',
    options: [
     
        
        { text: 'Yourself', valueSaving: 0 ,valueTotal:200 ,  task:'120 liters more with each car wash, take the necessary action!', category:'Car owners' ,type:'Task' },
        { text: 'pressure washer system', valueSaving: 120 ,valueTotal:80 ,task:'Washing your car by pressure washer systems you saved 120 liters water , congratulations!', category:'Car owners' , type:'Achievement'},
    ]

}


]);


  const handleTaskSelection = (task) => {
  
    const taksQuestion = questionsx.filter((answer) => answer.id === task.questionid);
   console.log(taksQuestion[0].text,taksQuestion[0].options)
   navigation.navigate('SubSurvey',taksQuestion[0]);
    //setReferringQuestion(task.question);
  };

  const handleAnswerSelection = (question, answer) => {

    setSelectedTasks((prevSelectedTasks) => {
      return prevSelectedTasks?.map((task) => {
        if (task.questionid === question.id) {
          return { ...task, answer: answer };
        }
        return task;
      });
    });
    setReferringQuestion(null);
  };

  const handleCompleteTasks = () => {
    setSelectedTasks((prevSelectedTasks) => {
      return prevSelectedTasks?.map((task) => {
        if (selectedTasks.some((selectedTask) => selectedTask.questionid === task.questionid)) {
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
      {referringQuestion && (
        <View style={styles.subPageContainer}>
          <Text style={styles.subPageTitle}>{referringQuestion.text}</Text>
          {referringQuestion?.options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswerSelection(referringQuestion, option)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
