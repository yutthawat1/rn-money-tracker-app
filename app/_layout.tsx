import { Ionicons } from "@expo/vector-icons"; // เพิ่มชุดไอคอนระดับพรีเมียม
import { Slot, useRouter, useSegments } from "expo-router";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  const currentScreen = (segments[0] as string) || "index";

  // เช็คเงื่อนไขหน้าแรกและหน้าต้อนรับ (คงเดิม)
  if (currentScreen === "index" || currentScreen === "welcome") {
    return <Slot />;
  }

  // ตัวแปรช่วยเช็คสถานะหน้าจอเพื่อความแม่นยำ (รองรับทั้งชื่อไฟล์แบบมี s หรือไม่มี s)
  const isIncome = currentScreen.includes("income");
  const isHome = currentScreen === "home";
  const isExpense = currentScreen.includes("expense");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />

      <View style={styles.mainContentFrame}>
        <Slot />
      </View>

      {/* แถบเมนูด้านล่างเวอร์ชันปรับปรุงความสวยงาม */}
      <View style={styles.bottomNavigationBar}>
        
        {/* เมนูรายรับ */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/income")}
          activeOpacity={0.6}
        >
          <Ionicons 
            name={isIncome ? "arrow-down-circle" : "arrow-down-circle-outline"} 
            size={26} 
            color={isIncome ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)"}
            style={isIncome ? styles.activeIconAnimation : null}
          />
          <Text
            style={[
              styles.navLabel,
              isIncome ? styles.activeLabel : styles.inactiveLabel,
            ]}
          >
            รายรับ
          </Text>
        </TouchableOpacity>

        {/* เมนูหน้าหลัก (ไอคอนจะเด่นและใหญ่กว่าเมนูอื่นตาม Mockup) */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/home")}
          activeOpacity={0.6}
        >
          <Ionicons 
            name={isHome ? "home" : "home-outline"} 
            size={30} 
            color={isHome ? "#b3f4ff" : "rgba(255, 255, 255, 0.6)"}
            style={[styles.homeIconStyle, isHome ? styles.activeIconAnimation : null]}
          />
          <Text
            style={[
              styles.navLabel,
              isHome ? styles.activeHomeLabel : styles.inactiveLabel,
            ]}
          >
            หน้าหลัก
          </Text>
        </TouchableOpacity>

        {/* เมนูรายจ่าย */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/expenses")}
          activeOpacity={0.6}
        >
          <Ionicons 
            name={isExpense ? "arrow-up-circle" : "arrow-up-circle-outline"} 
            size={26} 
            color={isExpense ? "#FFA2A2" : "rgba(255, 255, 255, 0.6)"}
            style={isExpense ? styles.activeIconAnimation : null}
          />
          <Text
            style={[
              styles.navLabel,
              isExpense ? styles.activeExpenseLabel : styles.inactiveLabel,
            ]}
          >
            รายจ่าย
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    ...Platform.select({
      web: {
        height: "100vh" as any,
        overflow: "hidden",
      },
    }),
  },
  mainContentFrame: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    marginBottom: 0,
  },
  bottomNavigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#3A8477", // สีเขียวหัวเป็ดตามธีมหลัก
    height: Platform.OS === "ios" ? 95 : 78,
    paddingBottom: Platform.select({
      ios: 22,
      web: 0,
      default: 8,
    }),
    borderTopLeftRadius: 30, // มนขอบให้ดูนุ่มนวลขึ้น
    borderTopRightRadius: 30,
    // เพิ่มมิติและเงาให้บาร์ลอยขึ้นมาจากพื้นหลังอย่างสวยงาม
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10, 
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
  },
  homeIconStyle: {
    marginBottom: -2, // ปรับสมดุลความสูงของไอคอนหน้าหลักที่ขนาดใหญ่กว่าเพื่อน
  },
  navLabel: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Kanit_700Bold",
    marginTop: 5,
    letterSpacing: 0.5,
  },
  activeLabel: {
    color: "#FFFFFF",
  },
  activeHomeLabel: {
    color: "#d3f8ff",
  },
  activeExpenseLabel: {
    color: "#ff9090",
  },
  inactiveLabel: {
    color: "#FFFFFF",
    opacity: 0.55, // ปรับความจางของเมนูที่ไม่ถูกเลือกให้ดูสบายตาขึ้น
  },
  activeIconAnimation: {
    transform: [{ scale: 1.08 }], // ขยายไอคอนขึ้นเล็กน้อยเมื่อถูกเลือกใช้งาน
  },
});