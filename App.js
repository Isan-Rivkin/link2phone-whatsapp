/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Icon, Button,Appbar,  Provider as PaperProvider } from 'react-native-paper';
import Image from 'react-native-scalable-image';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
//import { Header } from 'react-native-elements';


const App: () => React$Node = () => {
  const [number, setNumber] = useState('');
  const [validNum, setValidNum] = useState(false);
  const [final, setFinal] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const parseNumber = (input) =>{ 
    let num = input 
    if(num.startsWith("+972")){
      num = num.replcate("+972", "")
    }
    num = num.replace("-", "")
    if(num.startsWith("0")){
      num = num.substring(1)
    }
    //return "972"+num
    return num
  }

  const isValidNumber = (input) =>{ 
    let parsed = parseNumber(input)
    parsed = "972"+parsed
    if (parsed.length === 12){
      return true 
    }
    return false 
  }
  const renderLink = (phone) => {

    phone = parseNumber(phone)
    //const url = 'whatsapp://';
    const url = `https://api.whatsapp.com/send?phone=972${phone}`
    Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  

  const getHeader= () => {
    return (
    <Appbar.Header
    style={{backgroundColor:'#25D366'}}>
      <Appbar.Content color='white' title="Link2Phone" subtitle="" />
    </Appbar.Header>
    )
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {getHeader()}
          <View style={styles.body}>
            <Input
              errorStyle={{ color: 'red' }}
              errorMessage={errMsg}
              placeholder='מספר טלפון'
              onChangeText={value => {
                if(value !== "" && !isValidNumber(value)){
                  setErrMsg("invalid phone number")
                }else if(value == ""){
                  setErrMsg("")
                }
                else{
                  setErrMsg("")
                }
                setNumber(value)
              }}
            />
            <Button
              onPress={()=>{ 
                
                renderLink(number)
              }}
              icon={({ size, color }) => (
              <Image
                source={require('./social-whatsapp-circle-512.png')}
                width={30}
              />
              )}
              >

            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
