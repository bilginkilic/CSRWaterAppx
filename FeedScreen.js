import * as React from 'react';


import {  Text, View, Image } from 'react-native';




const FeedScreen = () => {


    return (<>
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to the Feed</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image source={require('./assets/water-drop.png')} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>
                            Learn how to save water with our tips and tricks
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image source={require('./assets/water-meter.png')} style={{ width: 50, height: 50 }} />

                        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>
                            Take our water consumption survey and track your progress
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image source={require('./assets/badge.png')} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>
                            Complete tasks and earn badges for your water conservation efforts
                        </Text>
                    </View>
                
            </View>
        </View>
        </>
    );

}

export default FeedScreen;