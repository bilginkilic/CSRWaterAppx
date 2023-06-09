import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import { AuthContext } from './AuthContext';
import { useLocalStorage } from './useLocalStorage';
import { GlobalContext } from './GlobalContext';
const Wizard = () => {
  const { takeTest } = React.useContext(AuthContext);
  const [questionIndex, setQuestionIndex] = useLocalStorage('questionIndex', 0);
  //const [answers, setAnswers] = useLocalStorage('answers', []);
  const [hasSurvey, setHasSurvey] = useLocalStorage('hasSurvey', false);
  const { answers, setAnswers } = useContext(GlobalContext);
  const [savingValue, setSavingValue] = useLocalStorage('savingValue', 0);
  const [totalValue, setTotalValue] = useLocalStorage('totalValue', 0);
  const [username, setUsername, clearStorage, showAllLocalStorage] = useLocalStorage('username', '');
 

  const [questionsw, setQuestionsw] = useState(  [
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
        { text: 'Yes', valueSaving: 0 ,valueTotal:36, task:'Do not waste water for rinsing, congratulations!', category:'Dishwashing' , type:'Task'},
        { text: 'No', valueSaving: 21 ,valueTotal:15,task:'Do you really need to rinse, take the necessary action!', category:'Dishwashing' , type:'Achievement'},
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
    text: 'Do the faucets in your house have slow-flows?',
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
        { text: 'Half full', valueSaving: 0 ,valueTotal:180 ,task:'90 liters more with full loaded laundries, take the necessary action!', category:'Laundry' , type:'Task'},
    ],
},
{
    id:7,
    text: 'Do you turn off the water while you are brushing?',
    options: [
        { text: 'Yes', valueSaving: 2,valueTotal:2  ,  task:'You saved 10 liters for your each brush , congratulations!', category:'Daily activities' ,type:'Achievement'},
        { text: 'No', valueSaving: 0,valueTotal:4 ,task:'Turn off the water and save 10 liters more for your each brush, take the necessary action!', category:'Daily activities' , type:'Task'},
    ],
},
{
    id:8,
    text: 'Does your faucets/pipes leak?',
    options: [
        { text: 'Yes', valueSaving: 0 ,valueTotal:32 ,  task:'You fixed your leaky faucets, congratulations!', category:'Plumbing' ,type:'Task'},
        { text: 'No', valueSaving: 32 ,valueTotal:0,task:'32 liters more with only one leaky faucet, take the necessary action!  ', category:'Plumbing' , type:'Achievement' },
    ],
},
{
    id:9,
    text: 'Do you have a car?',
    options: [
        { text: 'No', valueSaving: 0 ,valueTotal:0 },
        
        { text: 'Yes', valueSaving: 0 ,valueTotal:0  },
     ]

},
{
    id:10,
    text: 'Do you wash your car yourself or do you use pressure washer system?',
    options: [
     
        
        { text: 'Yourself', valueSaving: 0 ,valueTotal:200 ,  task:'120 liters more with each car wash, take the necessary action!', category:'Car owners' ,type:'Task' },
        { text: 'pressure washer system', valueSaving: 120 ,valueTotal:80 ,task:'Washing your car by pressure washer systems you saved 120 liters water , congratulations!', category:'Car owners' , type:'Achievement'},
    ]

}


]);

useEffect(() => {

  const loadData = async () => {
    try {
      const answersJson = await AsyncStorage.getItem('answers');
      if (answersJson) {
        const answers = JSON.parse(answersJson);
        setAnswers(answers);
        setQuestionIndex(answers.length);
      }

       
    } catch (error) {
      console.error(error);
    }
  };

  loadData();
}, []);


  const handleSelectOption = (question, opt) => {
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
    setSavingValue(savingValue + opt.valueSaving);
    setTotalValue(totalValue + opt.valueTotal);

    if (question.id === 9 && opt.text === 'No') {
      setQuestionIndex(questionIndex + 2);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };


  // const saveAnswersTest = async () => {
  //   try {
  //   showAllLocalStorage()
  //   } catch (error) {
  //     console.log(error);
  //     alert('Failed to save answers. Please try again.');
  //   }
  // };

  const saveAnswers = async () => {
    try {
      await AsyncStorage.setItem('answers', JSON.stringify(answers));
      await AsyncStorage.setItem(
        'benchmark',
        JSON.stringify({ savingValue: savingValue, totalValue: totalValue })
      );
      await AsyncStorage.setItem('isTaken', JSON.stringify(true));
      setHasSurvey(true)
      takeTest();
    } catch (error) {
      console.log(error);
      alert('Failed to save answers. Please try again.');
    }
  };
   
 
  const currentQuestion = questionsw[questionIndex];
  return (
    <View style={styles.container}>
      {questionIndex < questionsw.length ? (
        <View>
          
          <Text style={styles.questionText}>{currentQuestion.text}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion?.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleSelectOption(currentQuestion, option)}
              >
                <Text style={styles.optionText}>{option?.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.waterDropContainer}>
            <Image source={require('./images/category/drop.png')} style={styles.waterDropImage} />
             
          </View>

          <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>You saved</Text>
          <Text style={styles.infoValue}>{savingValue} L</Text>
          <Text style={styles.infoText}>water!</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Your water footprint</Text>
          <Text style={styles.infoValue}>{totalValue} L!</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Istanbul dam fill rate </Text>
          <Text style={styles.infoValue}>95%</Text>
        </View>
      </View>


          <Text style={styles.finalText}>Thank you for taking the survey!!!</Text>
          <TouchableOpacity style={styles.saveButton} onPress={saveAnswers}>
            <Text style={styles.saveButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  questionText: {
    fontSize: 22,
    margin: 10,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#3498db',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalText: {
    fontSize: 22,
    margin: 10,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  waterDropContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  waterDropImage: {
    width: 120,
    height: 120,
  },
  savingValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  infoContainer: {
    marginBottom: 30,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#666',
    marginRight: 10,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Wizard;
