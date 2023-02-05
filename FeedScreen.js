import * as React from 'react';
import {  ScrollView, Text, View, Image } from 'react-native';

const FeedScreen = () => {
    return (
        <ScrollView style={{ flex: 1, padding: 20 }}>
                
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>
                        Welcome to the Water app! This app is designed to help you learn how to save water in your daily life. We understand that small changes can make a big difference when it comes to water conservation, and that's why we've created this app to help you take action.
                    </Text>
                </View>
               
                <View style={{ flex: 1, alignItems: 'center' }}>
                 
                    <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>
                        Before you get started, we would like to ask you a few questions about your current water consumption habits. This survey will help us understand how you currently use water, and it will also serve as a benchmark to measure the impact of the tasks we will be suggesting later on.
                    </Text>
                </View>
               
                <View style={{ flex: 1, alignItems: 'center' }}>
                
                    <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>
                        Once you've completed the survey, you'll have access to 21 simple tasks that will help you reduce your water usage. These tasks are easy to follow and can be implemented immediately. They cover a wide range of areas, from reducing food waste to fixing leaks, and from installing low-flow shower heads to taking shorter showers.
                        By making small changes in your daily routine, you can make a big impact on water conservation. We hope that this app will help you learn how to save water and make a difference in your community. Thank you for your commitment to water conservation!
                    </Text>
                </View>
                <View style={{ height: 50, width: 50, backgroundColor: 'red' }} />
            </View>
        </ScrollView>
    );
};

export default FeedScreen;
