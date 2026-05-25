import { router } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function Index() {

  // หน่วงเวลาหน้าจอ 3 วินาที (คงเดิม)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 3000);
 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* ซ่อนหรือปรับสีแถบสถานะด้านบนให้เนียนไปกับตัวแอป */}
      <StatusBar barStyle="light-content" backgroundColor="#1E7569" />
      
      {/* ส่วนเนื้อหาหลัก (จัดให้อยู่กึ่งกลางหน้าจออย่างสมบูรณ์) */}
      <View style={styles.header}>
        <Text style={styles.title}>Money Tracking</Text>
        <Text style={styles.subtitle}>รายรับ-รายจ่ายของฉัน</Text>
      </View>
      
      {/* ส่วนท้าย (ปรับให้ชิดขอบล่างพอดี ไม่ลอยขึ้นมาตรงกลางหน้าจอ) */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Create by 6852D10016</Text>
        <Text style={styles.sauText}>- SAU -</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E7569', // ปรับสีพื้นหลังให้คุมโทนกับหน้า Home และ Form
    alignItems: 'center',
    justifyContent: 'space-between', // แยกเนื้อหาหลักกับฟุตเตอร์ออกจากกันอย่างมีมิติ
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%', // ดันเนื้อหาหลักลงมาเล็กน้อยเพื่อความสมดุล
  },
  title: {
    fontSize: 38, 
    fontWeight: 'bold',
    color: '#FFFFFF', // เปลี่ยนข้อความพิมพ์ใหญ่เป็นสีขาวเด่นชัด
    letterSpacing: 1,  // เพิ่มระยะห่างตัวอักษรให้ดูพรีเมียมขึ้น
    textShadowColor: 'rgba(0, 0, 0, 0.15)', // ใส่เงาบางๆ ให้ข้อความดูมีมิติ
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#E0F2F1', // ใช้สีมินต์อ่อนๆ เพื่อแยกความสำคัญจากชื่อแอป
    marginTop: 10,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40, // ปรับให้ห่างจากขอบล่างของหน้าจอโทรศัพท์อย่างพองาม
  },
  footerText: {
    fontSize: 14,
    color: '#B2DFDB', // สีข้อความเครดิตแบบ Soft-tone
    fontWeight: '500',
  },
  sauText: {
    fontSize: 13,
    color: '#B2DFDB',
    marginTop: 4,
    fontWeight: 'bold',
    letterSpacing: 4, // เพิ่มช่องว่างให้ชื่อสถาบันดูเป็นสไตล์มินิมอล
  },
});