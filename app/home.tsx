import { supabase } from "@/services/supabase";
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
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

  const formatThaiDate = (dateString: string) => {
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const d = new Date(dateString);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
  };

  return (
    <View style={styles.container}>
      {/* Banner ส่วนบน */}
      <View style={styles.topBanner}>
        <View>
          <View style={styles.profileRow}>
            <Text style={styles.profileName}>Yutthawat Thongwai</Text>
            <Image source={require('@/assets/images/me.jpg')} style={styles.avatar} />
          </View>
          
          {/* Card แสดงยอดเงินคงเหลือลอยขึ้นมา */}
          <View style={styles.balanceCard}>
            <Text style={styles.cardTitle}>ยอดเงินคงเหลือ</Text>
            <Text style={styles.mainBalance}>{summary.balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</Text>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <View style={styles.subBox}>
                <View style={styles.iconLabel}><Ionicons name="arrow-down-circle" size={16} color="#FFF" /><Text style={styles.subLabel}> ยอดเงินเข้ารวม</Text></View>
                <Text style={styles.subAmount}>{summary.income.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</Text>
              </View>
              <View style={styles.subBox}>
                <View style={styles.iconLabel}><Ionicons name="arrow-up-circle" size={16} color="#FFF" /><Text style={styles.subLabel}> ยอดเงินออกรวม</Text></View>
                <Text style={styles.subAmount}>{summary.expense.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* รายการเงินเข้า/เงินออก */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionHeader}>เงินเข้า/เงินออก</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#1E7569" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <View style={styles.itemLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: item.type === 'income' ? '#E8F5E9' : '#FFEBEE' }]}>
                    <Ionicons name={item.type === 'income' ? 'arrow-down' : 'arrow-up'} size={18} color={item.type === 'income' ? '#2E7D32' : '#C62828'} />
                  </View>
                  <View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDate}>{formatThaiDate(item.date)}</Text>
                  </View>
                </View>
                <Text style={[styles.itemAmount, { color: item.type === 'income' ? '#2E7D32' : '#C62828' }]}>
                  {Number(item.amount).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

// สไตล์ชีทรวมสำหรับแสดงผลหน้า Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
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
  listContainer: { flex: 1, marginTop: 60, paddingHorizontal: 20 },

  sectionHeader: { fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 15 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderColor: '#EEE' },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemTitle: { fontSize: 16, fontWeight: '500', color: '#333' },
  itemDate: { fontSize: 12, color: '#888', marginTop: 2 },
  itemAmount: { fontSize: 16, fontWeight: 'bold' }
});