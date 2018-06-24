import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SocialLogin from './src/components/SocialLogin';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyClef4i6edmDEjYHNcvCOholiNhoAx8jOo",
  authDomain: "gigi-native-app.firebaseapp.com",
  databaseURL: "https://gigi-native-app.firebaseio.com",
  projectId: "gigi-native-app",
  storageBucket: "gigi-native-app.appspot.com",
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {

    constructor (props) {
      super(props);
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          console.log(user.displayName)
        }
      })
    }

    render() {
      return ([

        <View style={styles.container}>
        </View>,
        <View style={styles.social}>
          <SocialLogin />
        </View>
      ]);
    }
  }

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  image: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
    resizeMode:'contain',
  },
  social: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
