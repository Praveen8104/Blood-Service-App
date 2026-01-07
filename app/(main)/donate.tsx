import { Colors } from '@/constants/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

// --- MOCK DATA ---
const MY_BLOOD_DATA = [
  { id: '1', date: '12 Dec 2025', location: 'City Blood Bank', status: 'Completed', units: '1 Unit' },
  { id: '2', date: '05 Aug 2025', location: 'Red Cross Center', status: 'Completed', units: '1 Unit' },
];

const OTHERS_BLOOD_DATA = [
  { id: '1', name: 'Suresh Kumar', bloodType: 'O+', urgency: 'High', hospital: 'Apollo Hospital' },
  { id: '2', name: 'Anjali Sharma', bloodType: 'B-', urgency: 'Normal', hospital: 'City Clinic' },
  { id: '3', name: 'John Doe', bloodType: 'A+', urgency: 'Critical', hospital: 'General Hospital' },
];

// --- SUB-SCREENS ---

const MyBloodScreen = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={[styles.tabContent, { backgroundColor: theme.background }]}>
      <FlatList
        data={MY_BLOOD_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.dateText, { color: theme.text }]}>{item.date}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <Text style={[styles.locationText, { color: theme.textMuted }]}>{item.location}</Text>
            <Text style={[styles.unitText, { color: theme.primary }]}>{item.units}</Text>
          </View>
        )}
      />
    </View>
  );
};

const OthersBloodScreen = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={[styles.tabContent, { backgroundColor: theme.background }]}>
      <FlatList
        data={OTHERS_BLOOD_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={styles.row}>
              <View style={[styles.bloodTypeCircle, { backgroundColor: theme.primaryLight }]}>
                <Text style={[styles.bloodTypeText, { color: theme.primary }]}>{item.bloodType}</Text>
              </View>
              <View style={styles.infoCol}>
                <Text style={[styles.nameText, { color: theme.text }]}>{item.name}</Text>
                <Text style={[styles.hospitalText, { color: theme.textMuted }]}>{item.hospital}</Text>
              </View>
              <View style={[styles.urgencyBadge, { backgroundColor: item.urgency === 'Critical' ? '#FFE5E5' : '#F0F0F0' }]}>
                <Text style={[styles.urgencyText, { color: item.urgency === 'Critical' ? theme.primary : '#666' }]}>{item.urgency}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// --- MAIN DONATE COMPONENT ---

const Donate = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Donations</Text>
      </View>
      
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textMuted,
          tabBarIndicatorStyle: { backgroundColor: theme.primary, height: 3 },
          tabBarLabelStyle: { fontSize: 14, fontWeight: '700', textTransform: 'none' },
          tabBarStyle: { backgroundColor: theme.card, elevation: 0, shadowOpacity: 0 },
        }}
      >
        <Tab.Screen name="My Blood" component={MyBloodScreen} />
        <Tab.Screen name="Others Blood" component={OthersBloodScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Donate;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    padding: 15,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateText: {
    fontWeight: '700',
    fontSize: 16,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    marginBottom: 10,
  },
  unitText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bloodTypeCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bloodTypeText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoCol: {
    flex: 1,
    marginLeft: 15,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  hospitalText: {
    fontSize: 13,
  },
  urgencyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  urgencyText: {
    fontSize: 11,
    fontWeight: 'bold',
  }
});