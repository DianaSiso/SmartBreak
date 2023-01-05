import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableHighlight } from 'react-native';

// Icons
import { MaterialIcons } from '@expo/vector-icons'; 

// Font Gotham
import { useFonts } from 'expo-font';

export default function Welcome() {
     // Loading Gotham font
    const [loaded] = useFonts({
        GothamMedium: require('./../../fonts/GothamMedium.ttf'),
        GothamBook: require('./../../fonts/GothamBook.ttf'),
    });

    const [transitionState, setTransitionState] = useState(false)

    if (!loaded) {
        return null;  // Returns null if unable to load the font
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView>
              <View style={styles.imageLogo} >
                <Image source={require('./../../imgs/img_logo_white_version.png')} />
              </View>
              <Text style={styles.textMessageTitleLogo}><Text style={{fontFamily: 'GothamMedium'}}>Smart Break</Text></Text> 
            </ScrollView>  
            
            <ScrollView style={styles.containerWelcome}>
              <Text style={styles.textWelcomeTitle}>Bem-vinde!</Text>
              <Text style={styles.textWelcomeText}>Faz pausas no trabalho, desliga os teus equipamentos e contribui para a diminuição do desperdício e excesso de energia. Converte o teu tempo em lucro e lazer!</Text>
              <TouchableHighlight style={styles.buttonWelcome}><Text style={styles.buttonText}>Entrar</Text></TouchableHighlight>
              <TouchableHighlight style={styles.buttonWelcome}><Text style={styles.buttonText}>Registar</Text></TouchableHighlight>
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
    backgroundColor: '#0051BA'
  },
  containerWelcome: {
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: "column",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 225,
  },
  imageLogo: {
    alignItems: 'center',
    paddingTop: 65,
  },  
  buttonText: {
    fontFamily: 'GothamBook',
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonWelcome: {
    backgroundColor: '#0051BA',
    justifyContent: 'center',
    height: 48,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  textWelcomeTitle: {
    fontSize: 24,
    textAlign: 'left',
    paddingTop: 20,
    fontFamily: 'GothamMedium',
    color: '#001025',
  },
  textWelcomeText: {
    fontSize: 16,
    textAlign: 'left',
    paddingTop: 15,
    paddingBottom: 40,
    fontFamily: 'GothamBook',
    lineHeight: 17,
    color: '#001025',
  },
  textMessageTitleLogo: {
    fontSize: 40,
    textAlign: 'center',
    paddingTop: 40,
    fontFamily: 'GothamBook',
    color: '#FFFFFF',
  },
});
