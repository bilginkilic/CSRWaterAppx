import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tasksstandart from './Tasks.js';

const MyDay = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [tasks, setTasks] = useState(tasksstandart);

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const day = today.getDate();
    const dayOfWeek = weekDays[today.getDay()];

    //   const handleSelectTask = (taskId) => {
    //     const task = tasks.find(task => task.id === taskId);
    //     setSelectedTasks([...selectedTasks, task]);
    //   }

    const handleSelectTask = (taskId) => {
        const task = tasks.find(tsk => tsk.id === taskId);
        setSelectedTasks([...selectedTasks, task]);
        const newTasks = tasks.filter(t => t.id !== task.id);
        setTasks(newTasks)
    }

    const handleSelectedTask = (taskId) => {
        //buralara puan eklemeeler...
        const task = selectedTasks.find(tsk => tsk.id === taskId);
        setTasks([...tasks, task])
        const newSelectedTasks = selectedTasks.filter(t => t.id !== task.id);
        setSelectedTasks(newSelectedTasks);


    }

    const renderTasks = () => {
        return (
            <View style={styles.taskContainer}>
                {tasks.map(task => (
                    <TouchableOpacity
                        key={task.id}
                        style={styles.taskButton}
                        onPress={() => handleSelectTask(task.id)}
                    >
                        <Image style={styles.taskImage} source={task.image} />
                        <Text style={styles.taskTitle}>{task.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    const renderSelectedTasks = () => {
        return (
            <View>
                {selectedTasks.map(task => (
                    <View key={task.id} style={styles.selectedTask}>

                      
                        <Text style={styles.selectedTaskTitle}>{task.title}</Text>
                        <TouchableOpacity
                            key={task.id}
                            style={styles.taskButton}
                            onPress={() => handleSelectedTask(task.id)}
                        >
                            <Text>remove</Text>
                        </TouchableOpacity>

                    </View>
                ))}
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Day</Text>
            </View>
            <View style={styles.calendarContainer}>
                <View style={styles.calendar}>
                    <Text style={styles.calendarDay}>{day}</Text>
                    <Text style={styles.calendarDayOfWeek}>{dayOfWeek}</Text>
                </View>
            </View>
            <View style={styles.selectedTasksContainer}>
                {renderSelectedTasks()}
            </View>
            <TouchableOpacity style={styles.addButton} onPress={openModal}>
                <Icon name="add" size={30} color="#0077B6" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>TASKS</Text>
                        {renderTasks()}

                        <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                            <Icon name="close" size={30} color="#0077B6" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );

}

const tasksr = [
    {
        id: 1,
        title: 'Use a reusable water bottle',
        description: 'Using a reusable water bottle helps to reduce plastic waste and conserve water. Consider purchasing a durable water bottle and bringing it with you wherever you go.',
        image: require('./images/reusable-bottle.jpg'),
    },
    {
        id: 2,
        title: 'Take shorter showers',
        description: 'By taking shorter showers, you can significantly reduce the amount of water you use. Consider timing your showers and aiming to keep them to 10 minutes or less.',
        image: require('./images/shorter-showers.jpg'),
    },
];
 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 30,
        backgroundColor: '#0077B6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    calendarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 40,
    },
    calendar: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 200,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    calendarDay: {
        color: '#0077B6',
        fontSize: 48,
        fontWeight: 'bold',
    },
    calendarDayOfWeek: {
        color: '#0077B6',
        fontSize: 24,
        fontWeight: 'bold',
    },
    selectedTasksContainer: {
        paddingHorizontal: 20,
    },
    selectedTask: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
       shadowOpacity: 0.2,
shadowRadius: 2,
elevation: 2,
},
selectedTaskTitle: {
fontSize: 16,
fontWeight: 'bold',
color: 'black',
},
addButton: {
backgroundColor: '#fff',
borderRadius: 50,
width: 60,
height: 60,
justifyContent: 'center',
alignItems: 'center',
position: 'absolute',
bottom: 30,
right: 30,
shadowColor: '#000',
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.3,
shadowRadius: 4,
elevation: 5,
},
taskContainer: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'center',
},
taskButton: {
flexDirection: 'column',
alignItems: 'center',
backgroundColor: 'white',
padding: 10,
borderRadius: 10,
margin: 5,
width: 150,
height: 150,
justifyContent: 'space-between',
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2,
shadowRadius: 2,
elevation: 2,
},
taskImage: {
width: 75,
height: 75,
borderRadius: 50,
},
taskTitle: {
fontSize: 16,
fontWeight: 'bold',
color: 'black',
textAlign: 'center',
},
modalOverlay: {
flex: 1,
backgroundColor: 'rgba(0,0,0,0.5)',
justifyContent: 'center',
alignItems: 'center',
},
modalContainer: {
backgroundColor: '#fff',
borderRadius: 10,
padding: 20,
alignItems: 'center',
justifyContent: 'center',
width: '80%',
},
modalTitle: {
fontSize: 24,
fontWeight: 'bold',
color: '#0077B6',
marginBottom: 20,
},
modalCloseButton: {
position: 'absolute',
top: 10,
right: 10,
},
});

 

export default MyDay;
