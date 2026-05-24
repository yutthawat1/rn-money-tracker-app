import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Welcome() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

      {/* รูป */}
      <Image source={require('../assets/images/logo.png')} style={styles.image}/>

      {/* ข้อความ */}
      <View style={styles.header}>
        <Text>บันทึกราย</Text>
        <Text>รับ-รายจ่าย</Text>
      </View>
      {/* ปุ่ม  */}
      <TouchableOpacity style={styles.button} onPress={() => {router.replace("/home")}}> 
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 350,
    marginBottom: 20
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5
  }
})