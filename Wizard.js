import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import { AuthContext } from './AuthContext';
import { useLocalStorage } from './useLocalStorage';


const Wizard = () => {
    const { takeTest } = React.useContext(AuthContext);
    //const [questionIndex, setQuestionIndex] = useState(0);
    const [questionIndex, setQuestionIndex] = useLocalStorage('questionIndex', 0);
  //  const [answers, setAnswers] = useState([]);
    const [answers, setAnswers] = useLocalStorage('answers', []);
  //  const [hasSurvey, setHasSurvey] = useLocalStorage('hasSurvey', false);
    const questions = [{
        text: 'How often do you take short showers?', options: [{ text: 'Always', value: 5 }, { text: 'Sometimes', value: 3 }, { text: 'Rarely', value: 1 },],
    },
    {
        text: 'Do you turn off the faucet while brushing your teeth?',
        options: [
            { text: 'Yes', value: 5 },
            { text: 'No', value: 1 },
        ],
    },
    {
        text: 'Do you use a reusable water bottle?',
        options: [
            { text: 'Yes', value: 5 },
            { text: 'No', value: 1 },
        ],
    },
    {
        text: 'Do you fix leaks promptly?',
        options: [
            { text: 'Yes', value: 5 },
            { text: 'No', value: 1 },
        ],
    },
    {
        text: 'Do you use a low-flow toilet?',
        options: [
            { text: 'Yes', value: 5 },
            { text: 'No', value: 1 },
        ],
    },
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                const answersJson = await AsyncStorage.getItem('answers');
                // const takenJson = await AsyncStorage.getItem('isTaken');
                if (answersJson) {
                    const answers = JSON.parse(answersJson);
                    setAnswers(answers);
                    setQuestionIndex(answers.length);
                }
                // if (takenJson) {
                //     const taken = JSON.parse(takenJson);
                //     setHasSurvey(taken);
                // }
            } catch (error) {
                console.error(error);
            }
        };
        loadData();
    }, []);

    const handleSelectOption = (value) => {
        setAnswers([...answers, value]);
        setQuestionIndex(questionIndex + 1);
    };

    const saveAnswers = async () => {
        try {
            await AsyncStorage.setItem('answers', JSON.stringify(answers));
            await AsyncStorage.setItem('isTaken', JSON.stringify(true));
            takeTest();
            console.log(answers);
        } catch (error) {
            console.log(error);
            alert('Failed to save answers. Please try again.');
        }
    };

    const currentQuestion = questions[questionIndex];
    return (
        <View style={styles.container}>
            {questionIndex < questions.length ? (
                <View>
                    <Text style={styles.questionText}>{currentQuestion.text}</Text>
                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionButton}
                                onPress={() => handleSelectOption(option.value)}
                            >
                                <Text style={styles.optionText}>{option.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ) : (
                <View>
                    <Text style={styles.finalText}>Thank you for taking the survey!</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={saveAnswers}>
                        <Text style={styles.saveButtonText}>Start   </Text>       
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
        backgroundColor: 'red',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: '70%',
        alignItems: 'center',
    },
    optionText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    finalText: {
        fontSize: 22,
        margin: 10,
        textAlign: 'center',
    },
    saveButton: {
        backgroundColor: 'red',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: '70%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
});

export default Wizard;