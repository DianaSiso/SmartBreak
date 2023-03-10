import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

// Password meter
import PassMeter from "react-native-passmeter";

// Font Gotham
import { useFonts } from "expo-font";

// Firebase
import firebase from "./../../config/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";

export default function Register() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });

  // select items
  const [open, setOpen] = useState(false);
  const [valueOrg, setValueOrg] = useState("");
  const [items, setItems] = useState([
    { label: "Universidade de Aveiro", value: "Universidade de Aveiro" },
    { label: "Universidade de Coimbra", value: "Universidade de Coimbra" },
  ]);

  // fields
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    true,
    false,
    false,
    false,
  ]);

  // Firebase store data
  const firestoreUserData = firebase.firestore().collection("users_data");
  const firestoreUserDevices = firebase.firestore().collection("users_devices");
  const firestoreUserRoutines = firebase
    .firestore()
    .collection("users_routines");

  // Firebase authentication
  const auth = getAuth();
  const registerFirebase = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        firestoreUserData.doc(userCredential.user.uid).set({
          name: name,
          lastName: lastName,
          email: email.trim().toLowerCase(),
          password: password.trim(),
          organization: valueOrg,
          uid: userCredential.user.uid,
          rewards: false,
          notifications: notifications,
          shareData: true,
          pause: false,
          battery: 0,
          teams: [],
          admin: false,
        });
        firestoreUserRoutines.doc(userCredential.user.uid).set({
          routines: [],
        });
        firestoreUserDevices.doc(userCredential.user.uid).set({
          devices: [],
        });

        dispatch(logUser(userCredential.user.uid));
        Alert.alert("Sucesso", "Utilizador registado com sucesso.");
        // navigate.navigate("Painel", {idUser: userCredential.user.uid})
      })
      .catch((error) => {
        Alert.alert("Erro", "O e-mail j?? est?? em uso.");
        setLoading(false);
      });
  };

  const loadingScreen = () => {
    return (
      <Image
        source={require("./../../imgs/img_loading_v2.gif")}
        style={{
          height: screenWidth / 3.4,
          width: screenWidth / 4,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      />
    );
  };


  const validate_email = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  const validate_password = (pass, pass2) => {
    if (pass != pass2) {
      alert("As palavras-passe n??o coincidem.");
      return false;
    }
    if (pass.length < 8) {
      alert("A palavra-passe deve ter no m??nimo 8 caracteres.");
      return false;
    }
    return true;
  };

  const submit = () => {
    setLoading(true);

    if (email.length == 0 || validate_email(email.trim()) == false) {
      Alert.alert("Preencha corretamente o campo E-mail");
      setLoading(false);
      return false;
    }
    if (name.length == 0) {
      Alert.alert("Preencha corretamente o campo Nome");
      setLoading(false);
      return false;
    }
    if (lastName.length == 0) {
      Alert.alert("Preencha corretamente o campo Apelido");
      setLoading(false);
      return false;
    }
    if (valueOrg == null) {
      Alert.alert("Preencha corretamente o campo Empresa");
      setLoading(false);
      return false;
    }
    if (password.length == 0) {
      Alert.alert("Preencha corretamente o campo Palavra-passe");
      setLoading(false);
      return false;
    }
    if (confirmPassword.length == 0) {
      Alert.alert("Preencha corretamente o campo Confirmar palavra-passe");
      setLoading(false);
      return false;
    }
    if (!validate_password(password, confirmPassword)) {
      setLoading(false);
      return false;
    }
    registerFirebase();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.groupContainer}>
        <Text style={styles.textMessageTitle}>
          <Text style={{ fontFamily: "GothamMedium" }}>Regista-te</Text>
        </Text>
        <Text style={styles.textMessageBody}>
          Estamos contentes por teres tomado esta iniciativa. Vem fazer energy
          breaks.
        </Text>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.subContainer}
      >
        {loading == true ? (
          loadingScreen()
        ) : (
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text>Nome</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setName(text)}
              />
              <Text>Apelido</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setLastName(text)}
              />
              <Text>Email</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setEmail(text)}
              />
              <Text>Empresa</Text>
              <DropDownPicker
                autoScroll={true}
                open={open}
                value={valueOrg}
                items={items}
                setOpen={setOpen}
                setValue={setValueOrg}
                setItems={setItems}
                style={styles.inputField}
                placeholder="" 
                multiple={false}
                showTickIcon={false}
                closeAfterSelecting={true}
                onChangeText={(text) => setOrganization(text)}
              />

              <Text>Palavra-passe</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputFieldPass}
                onChangeText={(text) => setPassword(text)}
              />
              <View
                style={{
                  overflow: "hidden",
                  width: "100%",
                  borderRadius: 8,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <PassMeter
                  showLabels={false}
                  password={password}
                  maxLength={15}
                  minLength={8}
                  labels={[]}
                />
              </View>
              <Text style={{ marginTop: 40 }}>Confirmar palavra-passe</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputField}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <Pressable
                activeOpacity={0.8}
                onPress={() => submit()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Registar</Text>
              </Pressable>
            </ScrollView>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

// Get screen dimensions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0051BA",
    flexDirection: "column",
  },
  groupContainer: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  subContainer: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 40,
    height: (4 * screenHeight) / 5,
  },
  registerPhoto: {
    height: screenWidth / 5,
    width: screenWidth / 5,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: screenWidth / 10,
    flex: 1 / 2,
  },
  inputField: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 40,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  },
  inputFieldPass: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  },
  buttonText: {
    fontFamily: "GothamBook",
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0051BA",
    justifyContent: "center",
    height: 48,
    borderRadius: 15,
    marginBottom: 40,
    marginTop: 20,
  },
  textMessageTitle: {
    fontSize: 24,
    textAlign: "left",
    paddingTop: 40,
    fontFamily: "GothamBook",
    color: "#FFFFFF",
  },
  textMessageBody: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
    paddingTop: 15,
    fontFamily: "GothamBook",
    color: "#FFFFFF",
  },
});
