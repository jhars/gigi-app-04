
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import { Button, Container, Content, Header, Form, Input, Item, Label, Thumbnail} from 'native-base';
import { Card, CardSection, Spinner } from './common';
import * as firebase from 'firebase';

class SocialLogin extends Component {

  state = { facebookID: null, error: '', loading: false, name: null };

  // onButtonPress() {
  //   const { facebookID } = this.state;
  //
  //   this.setState({ error: '', loading: true });
  //
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(this.onLoginSuccess.bind(this))//IMPORTANT Syntax Here!!! -- this.methodName.bind(this)
  //       //THIS IS THE PLACE...
  //       //New Event Handler to figure out if a user is signed in or signed out.
  //
  //     .catch(() => {
  //       firebase.auth().createUserWithEmailAndPassword(email, password)
  //         .then(this.onLoginSuccess.bind(this))
  //         .catch(this.onLoginFail.bind(this));
  //     });
  // }
  componentWillMount() {
    this.setState({ error: '', loading: true });
  }



  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
        this.setState({
          name: user.displayName,
          facebookID: user.uid,
          loading: false
        })
      }
    })
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess(credential) {
    this.setState({
      facebookID: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    if (this.state.facebookID) {
      return (
        <Text>
          Welcome, {this.state.name}
        </Text>
      );
    }

    return (
      <Button
        full
        rounded
        primary
        onPress={() => this.loginWithFacebook()}
      >
        <Text style={{ color: 'white' }}> Login with Facebook</Text>
      </Button>
    );

  }

  renderName() {
    return (
      <Text>
        {this.state.name}
      </Text>
    )

  }

  async loginWithFacebook() {

    const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync('1785738094839350', { permissions: ['public_profile'] })
    if(type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInWithCredential(credential)
        .then( () => {
          // console.log(credential)
          // console.log(this)
        })
        .catch((error) => {
        console.log(error )
      })
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}



//================================================================//
const styles = StyleSheet.create({
  linkedin: {
    alignItems: 'center',
    width:225,
    padding: 15,
    marginTop: 30,
    marginLeft: 1,
    marginRight: 1,
    borderStyle: 'solid',
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'black',


  },
  facebook: {
      padding: 50,
      marginTop: 75
  },
});


export default SocialLogin;
