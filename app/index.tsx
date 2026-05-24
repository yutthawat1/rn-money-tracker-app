import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';


export default function Index() {

  // หน่วงเวลาหน้าจอ
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 3000);
 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View  style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 30 , fontWeight: 'bold'}}>Money Tracking</Text>
        <Text>รายรับ-รายจ่ายของฉัน</Text>
      </View>
      
      <View style={styles.footer}>
        <Text>Create by 6852D10016</Text>
        <Text>-SAU-</Text>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20C92D',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 10,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
});