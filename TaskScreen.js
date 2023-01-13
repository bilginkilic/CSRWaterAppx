import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const TaskScreen = () => {
    const [taskIndex, setTaskIndex] = useState(0);
    const [completedTasks, setCompletedTasks] = useState([]);
    const tasks = [
        {
            title: 'Use public transport or carpool',
            description: 'Taking public transport or carpooling instead of driving alone is a great way to reduce your carbon footprint.',
            image: require('./assets/water-meter.png'),
        },
        {
            title: 'Reduce meat consumption',
            description: 'Eating less meat can significantly reduce your carbon footprint as the meat industry is a major contributor to greenhouse gas emissions.',
            image: require('./assets/water-meter.png'),
        },
        {
            title: 'Unplug electronics when not in use',
            description: 'Leaving electronics plugged in when not in use wastes energy and contributes to carbon emissions.',
            image: require('./assets/water-meter.png'),
        },
        {
            title: 'Use a reusable water bottle',
            description: 'Using a reusable water bottle instead of disposable plastic bottles can help reduce plastic waste and carbon emissions.',
            image: require('./assets/water-meter.png'),
        },
        {
            title: 'Plant a tree',
            description: 'Planting trees helps remove carbon dioxide from the atmosphere and can also provide shade and habitat for wildlife.',
            image: require('./assets/water-meter.png'),
        },
    ];

    const handleCompleteTask = (index) => {
        setCompletedTasks([...completedTasks, index]);
        setTaskIndex(taskIndex + 1);
    }

    const currentTask = tasks[taskIndex];
    return (
        <View style={styles.container}>
            {taskIndex < tasks.length ? (
                <View>
                    <Text style={styles.title}>{currentTask.title}</Text>
                    <Image source={currentTask.image} style={styles.image} />
                    <Text style={styles.description}>{currentTask.description}</Text>
                    <TouchableOpacity style={styles.completeButton} onPress={() => handleCompleteTask(taskIndex)}>
                        <Text style={styles.completeButtonText}>Complete</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text style={styles.finalText}>Congratulations on completing all tasks!</Text>
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
    },
    description: {
        fontSize: 14,
        margin: 10,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        margin: 10,
    },
    completeButton: {
        backgroundColor: '#e91e63',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    completeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
export default TaskScreen;


