import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


class Contact extends Component {
    
    
    static navigationOptions = { 
        title: 'Contact Us'
    }

    //CONFIGURE A METHOD SEND MAIL //
    sendMail() {
        MailComposer.composeAsync({ // async METHOD TO SET UP A NEW EMAIL //
            //OPTIONS ARGUMENTS //
            recipients: ['campsite@nucamp.co'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        })
    }

    render () {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
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
                            <Button // ENHANCE VERSION W/ CONFIG OPTIONS //
                                title="Send Email"
                                buttonStyle={{ backgroundColor: '#5637DD', margin: 40 }}
                                icon={<Icon // ICON PROP 
                                    name='envelope-o'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{marginRight: 10}}
                                    />}

                                // ON PRESS PROP //
                                onPress={() => this.sendMail()} // WHEN THIS BUTTON IS PRESSED, THE SEND MAIL EVENT HANDLER METHOD WILL BE EXECUTED // 
                            />
                        </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
   
}
export default Contact;