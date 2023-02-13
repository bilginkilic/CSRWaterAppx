import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import { AuthContext } from './AuthContext';
import { useLocalStorage } from './useLocalStorage';


const Wizard = () => {
    const { takeTest } = React.useContext(AuthContext);
    const [questionIndex, setQuestionIndex] = useLocalStorage('questionIndex', 0);
    const [answers, setAnswers] = useLocalStorage('answers', []);
    const questions = [{        text: 'How careful are you about water consumption?',         options: [{ text: 'I\'m very careful', value: 5 },                   { text: 'I\'m somewhat careful', value: 3 },                   { text: 'I\'m not careful', value: 1 },],
    },
    {
        text: 'Do you turn off the faucet while brushing your teeth?',
        options: [
            { text: 'Yes, I do', value: 5 },
            { text: 'No, I don\'t', value: 1 },
        ],
    },
    {
        text: 'What steps do you take for water conservation?',
        options: [
            { text: 'Taking shorter showers', value: 5 },
            { text: 'Turning off the faucet while washing hands', value: 3 },
            { text: 'Using a container to wash vegetables/fruits instead of running water', value: 3 },
            { text: 'Other steps', value: 2 },
            { text: 'I don\'t take any steps', value: 1 },
        ],
    },
    {
        text: 'When do you run your dishwasher?',
        options: [
            { text: 'When it\'s completely full', value: 5 },
            { text: 'When it\'s half full', value: 3 },
            { text: 'Always, regardless of how full it is', value: 1 },
        ],
    },
    {
        text: 'What water-saving products do you use?',
        options: [
            { text: 'Water-saving showerhead', value: 5 },
            { text: 'Aerator/faucet cartridge', value: 5 },
            { text: 'Other products', value: 2 },
            { text: 'I don\'t use any products', value: 1 },
        ],
    },
    ];

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
