import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {
    
    
    static navigationOptions = { // task 1 bul 2 //
        title: 'Contact Us'
    }

    render () {
        return ( // Task 1 bul 2 //
            <ScrollView>
                <Card 
                title='Contact Information'
                wrapperStyle={{margin: 20}}>
                    <Text
                        style={{marginBottom: 10}}>
                        1 Nucamp Way{"\n"}
                        Seattle, WA 98001{"\n"}
                        U.S.A.
                    </Text>
                    <Text>
                        Phone: 1-206-555-1234
                    </Text>
                    <Text>
                        Email: campsites@nucamp.co
                    </Text>
                </Card>
            </ScrollView>
        );
    }
   
}
export default Contact;