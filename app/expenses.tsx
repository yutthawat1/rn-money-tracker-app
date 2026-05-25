import { supabase } from '@/services/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { formStyles } from './income'; // รียูส Style ร่วมกันได้เพื่อความสะอาดของโค้ด


export default function ExpensesScreen({ navigation }: any) {

  const isFocused = useIsFocused();
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
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      }
    ]);

    if (!error) {
      Alert.alert('สำเร็จ', 'บันทึกเงินออกเรียบร้อยแล้ว', [
        { text: 'ตกลง', onPress: () => { handleStart(); } }
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
      {/* <View style={formStyles.topHeader}><Text style={formStyles.headerText}>บันทึกเงินออก</Text></View> */}
      <View style={formStyles.body}>
        <Text style={formStyles.dateText}>วันที่ 1 มกราคม 2568</Text>
        <Text style={formStyles.sectionType}>เงินออก</Text>

        <View style={formStyles.inputContainer}>
          <Text style={formStyles.inputLabel}>รายการเงินออก</Text>
          <TextInput style={formStyles.input} placeholder="รายการเงินออก" placeholderTextColor="#AAA" value={detail} onChangeText={setDetail} />
        </View>

        <View style={formStyles.inputContainer}>
          <Text style={formStyles.inputLabel}>จำนวนเงินออก</Text>
          <TextInput style={formStyles.input} placeholder="0.00" placeholderTextColor="#AAA" keyboardType="numeric" value={amount} onChangeText={setAmount} />
        </View>

        <TouchableOpacity style={formStyles.submitButton} onPress={handleSave}>
          <Text style={formStyles.submitButtonText}>บันทึกเงินออก</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
