import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {Alert, TextInput, StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableHighlight, TouchableOpacity  } from 'react-native';

// Font Gotham
import { useFonts } from 'expo-font';

export default function Password() {
     // Loading Gotham font
    const [loaded] = useFonts({
        GothamMedium: require('./../../fonts/GothamMedium.ttf'),
        GothamBook: require('./../../fonts/GothamBook.ttf'),
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    if (!loaded) {
        return null;  // Returns null if unable to load the font
    }

    const validate_password = (pass, pass2) => {
        if (pass != pass2) {
          Alert.alert('As palavras-passe não coincidem.')
          return false;
        }
        if (pass.length < 8) {
          Alert.alert('A palavra-passe deve ter no mínimo 8 caracteres.')
          return false;
        }
        return true;
    }

    const submit = () => {
        if (email.length == 0) {
          Alert.alert('Preencha corretamente o campo E-mail');
          return false;
        } 
        if (password.length == 0 ) {
          Alert.alert('Preencha corretamente o campo Palavra-passe');
          return false;
        }
        if (confirmPassword.length == 0 ) {
          Alert.alert('Preencha corretamente o campo Confirmar palavra-passe');
          return false;
        } 
        if (!validate_password(password, confirmPassword)) {
          return false;
        }   
    }

    return (
      <View style={styles.container}>
          <StatusBar style="light" />
            <Text style={styles.textMessageTitle}><Text style={{fontFamily: 'GothamMedium'}}>Esqueceu-se da palavra-passe?</Text></Text> 
            <Text style={styles.textMessageBody}>Introduza uma nova palavra passe e de seguida volte a confirmá-la.</Text>


          <ScrollView style={{marginTop: 80}}>            
            <Text style={styles.textMessageBody}>Email</Text> 
            <TextInput style={styles.inputField} onChangeText={(text) => setEmail(text)}/>      
            <Text style={styles.textMessageBody}>Nova palavra-passe</Text>
            <TextInput  secureTextEntry={true} style={styles.inputField} onChangeText={(text) => setPassword(text)}/>
            <Text style={styles.textMessageBody}>Confirmar nova palavra-passe</Text> 
            <TextInput  secureTextEntry={true} style={styles.inputField} onChangeText={(text) => setConfirmPassword(text)}/>    
            <TouchableOpacity activeOpacity={0.5} onPress={() => submit()} style={styles.button}><Text style={styles.buttonText}>Redefinir palavra-passe</Text></TouchableOpacity>
          </ScrollView>
      </View>   
  );
}

// Get screen dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height - 50;

const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingTop: 65,
  backgroundColor: '#0051BA',
  flexDirection: "column",
  paddingLeft: 25,
  paddingRight: 25,
},
subContainer: {
  backgroundColor: '#FFF',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderTopRightRadius: 50,
  borderTopLeftRadius: 50,
  paddingLeft: 25,
  paddingRight: 25,
  paddingTop: 65,
  height: screenHeight/2,
},
inputField: {
  borderBottomColor: '#FFF',
  borderBottomWidth: 1,
  marginBottom: 40,
  borderTopWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderRadius: 0,
},
buttonText: {
  fontFamily: 'GothamBook',
  color: '#0051BA',
  fontSize: 18,
  textAlign: 'center',
},
button: {
  backgroundColor: '#FFF',
  justifyContent: 'center',
  height: 48,
  borderRadius: 8,
  marginBottom: 40,
  marginTop: 10,
},
textMessageTitle: {
  fontSize: 24,
  textAlign: 'left',
  paddingTop: 40,
  fontFamily: 'GothamBook',
  color: '#FFFFFF',
},
textMessageBody: {
  fontSize: 16,
  textAlign: 'left',
  paddingTop: 15,
  fontFamily: 'GothamBook',
  color: '#FFFFFF',
},
imageLogo: {
  alignItems: 'center',
  paddingTop: 65,
}, 
});
