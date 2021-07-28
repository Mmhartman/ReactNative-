import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};

function Mission({}) { // task 2 //

    return (
        <Card
        title='Our Mission'
        wrapperStyle={{margin: 10 }}>
            <Text>
            We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    );
}
class About extends Component {
    
    
    static navigationOptions = { // task 1 bul 2 //
        title: 'About Us' 
    }

    render () {

        const renderPartner = ({item}) => { // task 3 // 
            return (
                <ListItem
                 title={item.name}
                 subtitle={item.description}
                 leftAvatar={{source: {uri: baseUrl + item.image}}}
                 />
            );
        };

        return ( 
            <ScrollView>
                <Mission /> 
                <Card
                    title='Community Partners'>
                    <FlatList 
                        data={this.props.partners.partners}
                        // 1st partner, entire part of the state that handles the partners data. 2nd partners data array // 
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
   
}
export default connect(mapStateToProps)(About);