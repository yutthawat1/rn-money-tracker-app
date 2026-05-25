import { supabase, transactionService } from "@/services/supabase";
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function IncomeScreen({ navigation }: any) {

      const isFocused = useIsFocused();
      const [currentDateText, setCurrentDateText] = useState("");
      const [loading, setLoading] = useState(true);
      const [transactions, setTransactions] = useState<any[]>([]);
      const [summary, setSummary] = useState({ balance: 0, income: 0, expense: 0 });
    
      const fetchData = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('transactions_tb')
          .select('*')
          .order('date', { ascending: false })
          .order('created_at', { ascending: false });
    
        if (!error && data) {
          setTransactions(data);
          let inc = 0;
          let exp = 0;
          data.forEach((item: { type: string; amount: any; }) => {
            if (item.type === 'income') inc += Number(item.amount);
            else exp += Number(item.amount);
          });
          setSummary({ income: inc, expense: exp, balance: inc - exp });
        }
        setLoading(false);
      };
    
      useEffect(() => {
        if (isFocused) fetchData();
      }, [isFocused]);
    
  const [detail, setDetail] = useState('');
  const [amount, setAmount] = useState('');

  const fetchSummary = useCallback(async () => {
    const data = await transactionService.getSummary();
    if (data) setSummary(data);
  }, []);
  useEffect(() => {
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const now = new Date();
    setCurrentDateText(
      `วันที่ ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear() + 543}`,
    );
    fetchSummary();
  }, [fetchSummary]);
  const handleStart = () => {
    router.push("/home");
  };

  const handleSave = async () => {
    if (!detail.trim() || !amount.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const { error } = await supabase.from('transactions_tb').insert([
      {
        title: detail,
        amount: parseFloat(amount),
        type: 'income',
        date: new Date().toISOString().split('T')[0]
      }
    ]);

    if (!error) {
      Alert.alert('สำเร็จ', 'บันทึกเงินเข้าเรียบร้อยแล้ว', [
        { text: 'ตกลง', onPress: () => {handleStart(); } }
      ]);
    } else {
      Alert.alert('เกิดข้อผิดพลาด', error.message);
    }
  };

  return (
    <View style={formStyles.container}>
      <View style={formStyles.topBanner}>
        <View>
          <View style={formStyles.profileRow}>
            <Text style={formStyles.profileName}>Yutthawat Thongwai</Text>
            <Image source={require('@/assets/images/me.jpg')} style={formStyles.avatar} />
          </View>
          
          {/* Card แสดงยอดเงินคงเหลือลอยขึ้นมา */}
          <View style={formStyles.balanceCard}>
            <Text style={formStyles.cardTitle}>ยอดเงินคงเหลือ</Text>
            <Text style={formStyles.mainBalance}>{summary.balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</Text>
            <View style={formStyles.divider} />
            <View style={formStyles.summaryRow}>
              <View style={formStyles.subBox}>
                <View style={formStyles.iconLabel}><Ionicons name="arrow-down-circle" size={16} color="#FFF" /><Text style={formStyles.subLabel}> ยอดเงินเข้ารวม</Text></View>
                <Text style={formStyles.subAmount}>{summary.income.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</Text>
              </View>
              <View style={formStyles.subBox}>
                <View style={formStyles.iconLabel}><Ionicons name="arrow-up-circle" size={16} color="#FFF" /><Text style={formStyles.subLabel}> ยอดเงินออกรวม</Text></View>
                <Text style={formStyles.subAmount}>{summary.expense.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* <View style={formStyles.topHeader}><View><Text style={formStyles.headerText}>บันทึกเงินเข้า</Text></View></View> */}
      <View style={formStyles.body}>
        <Text style={formStyles.dateText}>{currentDateText}</Text> 
        <Text style={formStyles.sectionType}>เงินเข้า</Text>

        <View style={formStyles.inputContainer}>
          <Text style={formStyles.inputLabel}>รายการเงินเข้า</Text>
          <TextInput style={formStyles.input} placeholder="รายการรับเงิน" placeholderTextColor="#AAA" value={detail} onChangeText={setDetail} />
        </View>

        <View style={formStyles.inputContainer}>
          <Text style={formStyles.inputLabel}>จำนวนเงินเข้า</Text>
          <TextInput style={formStyles.input} placeholder="0.00" placeholderTextColor="#AAA" keyboardType="numeric" value={amount} onChangeText={setAmount} />
        </View>

        <TouchableOpacity style={formStyles.submitButton} onPress={handleSave}>
          <Text style={formStyles.submitButtonText}>บันทึกเงินเข้า</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const formStyles = StyleSheet.create({
  container: { flex: 1,
     backgroundColor: '#F8F9FA' 
    },
  topHeader: { backgroundColor: '#1E7569', padding: 20, alignItems: 'center' },
  headerText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  body: { flex: 1, padding: 24, 
    // backgroundColor: '#FFF', 
    marginTop: 30},
  dateText: { fontFamily: "Kanit_700Bold",
    fontSize: 28,
    color: "#2D3748",
    textAlign: "center", },
  sectionType: { fontSize: 18, fontWeight: 'bold', color: '#555', textAlign: 'center', marginVertical: 15 },
  inputContainer: { marginBottom: 20, borderWidth: 1.5, borderColor: '#1E7569', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, position: 'relative' },
  inputLabel: { position: 'absolute', top: -10, left: 12, backgroundColor: '#F8F9FA', paddingHorizontal: 6, fontSize: 12, color: '#1E7569', fontWeight: '500' },
  input: { fontSize: 16, color: '#000', marginTop: 4, height: 40 },
  submitButton: { backgroundColor: '#62A39B', borderRadius: 25, paddingVertical: 16, alignItems: 'center', marginTop: 30, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  submitButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  topBanner: { 
    backgroundColor: '#1E7569', 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30, 
    paddingHorizontal: 20, 
    paddingBottom: 110, 
    paddingTop: 50 
  },
  profileRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 25 
  },

  profileName: { 
    color: '#FFF', 
    fontSize: 20, 
    fontWeight: 'bold',
    // marginBottom: 10
  },

  avatar: { width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    borderWidth: 2, 
    borderColor: '#FFF' 
  },
  
  balanceCard: { 
    backgroundColor: '#227066', 
    borderRadius: 20, 
    padding: 10, 
    position: 'absolute', 
    bottom: -150, 
    left: 20, 
    right: 20, 
    shadowColor: '#000', 
    shadowOpacity: 0.15, 
    shadowRadius: 10, 
    elevation: 6,
    // paddingTop: 50
  },
  cardTitle: { 
    color: '#E0F2F1', 
    fontSize: 14, 
    textAlign: 'center' 
  },
  mainBalance: { color: '#FFF', fontSize: 34, fontWeight: 'bold', textAlign: 'center', marginVertical: 5 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  subBox: { flex: 1, alignItems: 'center' },
  iconLabel: { flexDirection: 'row', alignItems: 'center' },
  subLabel: { color: '#E0F2F1', fontSize: 12 },
  subAmount: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginTop: 4 },
});