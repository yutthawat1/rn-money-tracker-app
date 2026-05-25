import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function WelcomeScreen({ navigation }: any) {
  
const handleStart = () => {
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* แสดงภาพคาแรคเตอร์ตาม Group 1.png */}
        <Image 
          source={require('@/assets/images/logo.png')} 
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Money Tracking</Text>
        <Text style={styles.subtitle}>แอปพลิเคชันบันทึกรายรับ - รายจ่าย</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>บันทึก รายรับ/รายจ่าย</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#349c8e' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,},
  image: { width: 280, height: 280, marginBottom: 30 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#E0F2F1', textAlign: 'center' },
  footer: { padding: 20, paddingBottom: 40 },
  button: { backgroundColor: '#FFF', paddingVertical: 16, borderRadius: 25, alignItems: 'center', },
  buttonText: { color: '#1E7569', fontSize: 18, fontWeight: 'bold' },
});