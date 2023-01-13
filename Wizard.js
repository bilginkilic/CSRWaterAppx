import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AuthContext } from './AuthContext';
import MainScreen from './MainScreen';

const Wizard = () => {
    const { takeTest } = React.useContext(AuthContext);
   

    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const questions = [
        {
            text: 'How often do you take short showers?',
            options: [
                { text: 'Always', value: 5 },
                { text: 'Sometimes', value: 3 },
                { text: 'Rarely', value: 1 },
            ],
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

    const handleSelectOption = (value) => {
        setAnswers([...answers, value]);
        setQuestionIndex(questionIndex + 1);
    }

    const saveAnswers = async () => {
        try {
            await AsyncStorage.setItem('answers', JSON.stringify(answers));
            alert('Answers saved successfully!');
        } catch (error) {
            console.log(error);
            alert('Failed to save answers. Please try again.');
          
        }
    }

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
                        <Text style={styles.saveButtonText}>Save answers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.finalText} onPress={takeTest}>
                    <Text style={styles.startTaskButtonText}>Start Tasks</Text>
                </TouchableOpacity>
                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
        fontSize: 18,
        margin: 10,
        textAlign: 'center',
    },
    answerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        width: '80%',
    },
    answerText: {
        fontSize: 18,
    },
    answerButton: {
        backgroundColor: '#e91e63',
        padding: 10,
        borderRadius: 5,
    },
    answerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    progressBarContainer: {
        margin: 10,
        width: '80%',
        height: 20,
        borderWidth: 1,
        borderColor: '#e91e63',
        borderRadius: 5,
    },
    progressBar: {
        backgroundColor: '#e91e63',
        height: '100%',
    },
});

const questions = [
    {
        id: 1,
        question: 'Do you take short showers?',
        answers: [
            { id: 1, answer: 'Yes' },
            { id: 2, answer: 'No' },
        ],
    },
    {
        id: 2,
        question: 'Do you turn off the tap while brushing your teeth?',
        answers: [
            { id: 1, answer: 'Yes' },
            { id: 2, answer: 'No' },
        ],
    },
    {
        id: 3,
        question: 'Do you use a low-flow showerhead?',
        answers: [
            { id: 1, answer: 'Yes' },
            { id: 2, answer: 'No' },
        ],
    },
    {
        id: 4,
        question: 'Do you fix any leaks in your home?',
        answers: [
            { id: 1, answer: 'Yes' },
            { id: 2, answer: 'No' },
        ],
    },
    {
        id: 5,
        question: 'Do you use a water-saving toilet?',
        answers: [
            { id: 1, answer: 'Yes' },
            { id: 2, answer: 'No' },
        ],
    },
];

function WaterConservationSurvey() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerPress = (answerId) => {
        setAnswers([...answers, answerId]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleSaveAnswers = () => {
        // Save answers to local storage
    };

    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        questionText: {
            fontSize: 18,
            margin: 10,
            textAlign: 'center',
        },
        optionsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 10,
            width: '80%',
        },
        optionButton: {
            backgroundColor: '#e91e63',
            padding: 10,
            borderRadius: 5,
        },
        optionText: {
            color: '#fff',
            fontWeight: 'bold',
        },
        finalText: {
            fontSize: 18,
            margin: 10,
            textAlign: 'center',
        },
        saveButton: {
            backgroundColor: '#e91e63',
            padding: 10,
            borderRadius: 5,
            margin: 10,
        },
        saveButtonText: {
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
        },

        startTaskButton: {
            backgroundColor: '#e91e63',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 20,
        },
        startTaskButtonText: {
            color: '#fff',
            fontWeight: 'bold',
        }

    });


};

export default Wizard;