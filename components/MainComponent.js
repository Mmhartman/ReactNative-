import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Constants from 'expo-constants';
import About from './AboutComponent';
import Contact from './ContactComponent';

import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native'; // Stack Navigator Icons  & Custom Side Drawer -> Text, ScrollView, Image //
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'; //Cstom side drwr DRAWERITEMS//
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'; // Stack Navigator Icons//
import SafeAreaView from 'react-native-safe-area-view'; // Custom Side Drawer//
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPromotions,
    fetchPartners } from '../redux/ActionCreators';


const mapDispatchToProps = {
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners
};


//Stack Navigator Icons //
const DirectoryNavigator = createStackNavigator(
  {
      Directory: { 
          screen: Directory,
          navigationOptions: ({navigation}) => ({
              headerLeft: <Icon
            // function body and give it an icon component //
            name='list'
            type='font-awesome'
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
            />
          })
        },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
      defaultNavigationOptions: ({navigation}) => ({ 
        // need to wrap this object in a (), so that arrow func doesn't get confused, might think that's the beginning curly brace for a func body but it is beginning curly brace for an object literal//
        headerStyle: {
            backgroundColor: '#5637DD'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon
            name='home'
            type='font-awesome'
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
        />
    })
  }
);


const AboutNavigator = createStackNavigator(
  {
      About: { screen: About }
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          headerStyle: {
              backgroundColor: '#5637DD'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: '#fff'
          },
          headerLeft: <Icon
              name='info-circle'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
          />
      })
  }
);

  
  const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);
//Stack Navigator Icons//
const CustomDrawerContentComponent = props => (
  <ScrollView>
      <SafeAreaView 
          style={styles.container}
          forceInset={{top: 'always', horizontal: 'never'}}>
          <View style={styles.drawerHeader}>
              <View style={{flex: 1}}>
                  <Image source={require('./images/logo.png')} style={styles.drawerImage} />
              </View>
              <View style={{flex: 2}}>
                  <Text style={styles.drawerHeaderText}>NuCamp</Text>
              </View>
          </View>
          <DrawerItems {...props} />
      </SafeAreaView>
  </ScrollView>
);





//Drawer Navigator Icons//
const MainNavigator = createDrawerNavigator(
  {
      Home: {
          screen: HomeNavigator,
          navigationOptions: {
              drawerIcon: ({tintColor}) => (
                  <Icon
                      name='home'
                      type='font-awesome'
                      size={24}
                      color={tintColor}
                  />
              )
          }
      },
      Directory: {
          screen: DirectoryNavigator,
          navigationOptions: {
              drawerIcon: ({tintColor}) => (
                  <Icon
                      name='list'
                      type='font-awesome'
                      size={24}
                      color={tintColor}
                  />
              )
          }
      },
      About: {
          screen: AboutNavigator,
          navigationOptions: {
              drawerLabel: 'About Us',
              drawerIcon: ({tintColor}) => (
                  <Icon
                      name='info-circle'
                      type='font-awesome'
                      size={24}
                      color={tintColor}
                  />
              )
          }
      },
      Contact: {
          screen: ContactNavigator,
          navigationOptions: {
              drawerLabel: 'Contact Us',
              drawerIcon: ({tintColor}) => (
                  <Icon
                      name='address-card'
                      type='font-awesome'
                      size={24}
                      color={tintColor}
                  />
              )
          }
      }
  },
  {
    drawerBackgroundColor: '#CEC8FF',
    contentComponent: CustomDrawerContentComponent 
  }
);

const AppNavigator = createAppContainer(MainNavigator)

class Main extends Component {

        componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }



    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}>
                <AppNavigator />
            </View>
        );
    }
}

//Stack Navigator Icons and custom side drawer//
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  drawerHeader: {
      backgroundColor: '#5637DD',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
  },
  drawerHeaderText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold'
  },
  drawerImage: {
      margin: 10,
      height: 60,
      width: 60
  },
  stackIcon: {
      marginLeft: 10,
      color: '#fff',
      fontSize: 24
  }
});

export default connect(null, mapDispatchToProps)(Main);