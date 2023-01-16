import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { Alert } from "react-native";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Firebase
import firebase from "./../../config/firebase.js"

// Font Gotham
import { useFonts } from "expo-font";

export default function EditPassword({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

 
  const [get, setGet] = useState(true);
  const [passwordStored, setPasswordStored] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const uid = 'Y8f9M4o03ceZrFjoWu6iOA8rm2F2'; // Posteriormente pegar da navegation

  if (!loaded) {
    return null;  // Returns null if unable to load the font
  }

  // Get data from firestore
  if (get) {
    firebase.firestore()
  .collection("users_data")
  .doc(uid)
  .get()
  .then((doc) => {
      setPasswordStored(doc.data().password);
      })
    setGet(false);
  }

  const validate_password = (pass) => {
    if (pass.length < 8) {
      Alert.alert("Erro!", "A palavra-passe deve ter no mínimo 8 caracteres.");
      return false;
    }
    return true;
  }


  const validate = () => {
    if (passwordStored != password) {
      Alert.alert("Falha de autenticação!", "Insira corretamente a sua palavra-passe atual.");
      return false;
    }
    else if (newPassword != confirmPassword) {
      Alert.alert("Erro!", "Digite corretamente a confirmação da palavra-passe.");
      return false;
    }
    else if (password == newPassword) {
      Alert.alert("Erro!", "As palavras-passe não podem ser iguais.")
      return false;
    }
    else {
      return validate_password(newPassword);
    }
  };


  const editarpasse = () => {
    
    Alert.alert("Atenção", "Deseja confirmar as alterações?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => {
          if (validate()) {
            firebase.firestore().collection('users_data').doc(uid).update({
            password: newPassword,
          })
          navigation.navigate("ProfileSettings")
          }
          
        }
      },
    ]);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>Alterar palavra-passe</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.edit}>
            <Text style={styles.text}>Palavra-passe atual</Text>
            <TextInput secureTextEntry={true} placeholder="" style={styles.input} onChangeText={(text) => setPassword(text)} value={password}/>
            <Text style={styles.text}>Nova palavra-passe</Text>
            <TextInput secureTextEntry={true} placeholder="" style={styles.input} onChangeText={(text) => setNewPassword(text)} value={newPassword}/>
            <Text style={styles.text}>Confirmar nova palavra-passe</Text>
            <TextInput secureTextEntry={true} placeholder="" style={styles.input} onChangeText={(text) => setConfirmPassword(text)} value={confirmPassword} />
          </View>
          <View >
            <TouchableOpacity activeOpacity={0.8} onPress={() => editarpasse()} underlayColor={"transparent"} style={styles.button} >
              <Text style={{ 
                color: "#FFFFFF",
                  fontFamily: "GothamBook",
                  fontSize: 16,
                  lineHeight: 24,
                  textAlign: 'center',
                }}
              > Concluído </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
  },

  edit: {
    marginTop: 30,
    width: "100%",
  },

  input: {
    marginTop: 0,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: "GothamBook",
    fontSize: 16,
    lineHeight: 16,
  },

  options: {
    marginTop: 30,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#0051BA",
  },

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
  },

  text: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    marginTop: 40,
    lineHeight: 24,
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 40,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: "#0051BA",
    width: screenWidth - 50,
  },

});
