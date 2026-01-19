import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

// --- MOCK DATA ---
const MY_BLOOD_REQUESTS = [
  { id: 'm1', name: 'Rajesh Patel', bloodType: 'B+', urgency: 'Critical', hospital: 'City Hospital', distance: '2.3km', time: '30 mins ago', units: '2 Units' },
  { id: 'm2', name: 'Priya Reddy', bloodType: 'B+', urgency: 'High', hospital: 'Apollo Hospital', distance: '4.5km', time: '2 hours ago', units: '1 Unit' },
  { id: 'm3', name: 'Emergency Case', bloodType: 'B+', urgency: 'Critical', hospital: 'General Clinic', distance: '0.8km', time: '10 mins ago', units: '3 Units' },
];

const OTHERS_BLOOD_REQUESTS = [
  { id: 'o1', name: 'Suresh Kumar', bloodType: 'O+', urgency: 'High', hospital: 'Metro Hospital', distance: '6.2km', time: '1 hour ago', units: '1 Unit' },
  { id: 'o2', name: 'Anjali Sharma', bloodType: 'B-', urgency: 'Critical', hospital: 'City Clinic', distance: '3.7km', time: '20 mins ago', units: '2 Units' },
  { id: 'o3', name: 'John Doe', bloodType: 'A+', urgency: 'Normal', hospital: 'General Hospital', distance: '5.1km', time: '3 hours ago', units: '1 Unit' },
];

// --- REUSABLE REQUEST ITEM COMPONENT ---
const RequestItem = ({ item, theme }: any) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [countdown, setCountdown] = useState(5);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up timers if component unmounts
  const cleanup = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => cleanup, []);

  const handleAccept = () => {
    setIsAccepted(true);
    setCountdown(5);

    // Start the 1-second interval for the visual countdown
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Start the 5-second timer to finalize the request
    timerRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsFinalized(true);
      setIsAccepted(false);
    }, 5000);
  };

  const handleUndo = () => {
    cleanup();
    setIsAccepted(false);
    setCountdown(5);
  };

  return (
    <View style={[
      styles.requestCard, 
      { backgroundColor: theme.card },
      isFinalized && { opacity: 0.7, borderColor: '#E8F5E9', borderWidth: 1 }
    ]}>
      {/* Card Header: Blood Type, Name, Urgency */}
      <View style={styles.requestHeader}>
        <View style={styles.headerLeft}>
          <View style={[styles.bloodTypeCircle, { backgroundColor: theme.primaryLight, borderColor: theme.primary }]}>
            <Text style={[styles.bloodTypeText, { color: theme.primary }]}>{item.bloodType}</Text>
          </View>
          <View style={styles.requestInfo}>
            <Text style={[styles.nameText, { color: theme.text }]}>{item.name}</Text>
            <Text style={[styles.hospitalText, { color: theme.textMuted }]} numberOfLines={1}>
              <Ionicons name="location" size={12} color={theme.textMuted} /> {item.hospital}
            </Text>
          </View>
        </View>
        
        {/* Urgency or Completed Badge */}
        <View style={[
          styles.urgencyBadge, 
          { 
            backgroundColor: isFinalized ? '#E8F5E9' : (item.urgency === 'Critical' ? '#FFE5E5' : '#FFF3E0'),
            borderColor: isFinalized ? '#2E7D32' : (item.urgency === 'Critical' ? theme.primary : '#F57C00'),
          }
        ]}>
          <Text style={[
            styles.urgencyText, 
            { color: isFinalized ? '#2E7D32' : (item.urgency === 'Critical' ? theme.primary : '#F57C00') }
          ]}>
            {isFinalized ? 'DONE' : item.urgency.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Card Details: Distance, Time, Units */}
      <View style={[styles.requestDetails, { borderTopColor: theme.background }]}>
        <View style={styles.detailItem}>
          <Ionicons name="navigate" size={14} color={theme.secondary} />
          <Text style={[styles.detailText, { color: theme.textMuted }]}>{item.distance}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time" size={14} color={theme.secondary} />
          <Text style={[styles.detailText, { color: theme.textMuted }]}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="water" size={14} color={theme.secondary} />
          <Text style={[styles.detailText, { color: theme.textMuted }]}>{item.units}</Text>
        </View>
      </View>

      {/* Action Area: Buttons, Countdown, or Final State */}
      <View style={styles.actionButtons}>
        {isFinalized ? (
          <View style={[styles.finalizedContainer, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="checkmark-done-circle" size={22} color="#2E7D32" />
            <Text style={styles.finalizedText}>Donation Request Accepted</Text>
          </View>
        ) : isAccepted ? (
          <View style={[styles.acceptedContainer, { backgroundColor: theme.primaryLight }]}>
            <View style={styles.acceptedContent}>
              <Ionicons name="time-outline" size={20} color={theme.primary} />
              <Text style={[styles.acceptedText, { color: theme.primary }]}>
                Confirming in {countdown}s...
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.undoButton, { borderColor: theme.primary }]}
              onPress={handleUndo}
            >
              <Text style={[styles.undoButtonText, { color: theme.primary }]}>Undo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity style={[styles.declineButton, { borderColor: theme.border }]}>
              <Text style={[styles.declineButtonText, { color: theme.textMuted }]}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.acceptButton, { backgroundColor: theme.primary }]}
              onPress={handleAccept}
            >
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

// --- TAB SCREENS ---

const MyBloodScreen = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  return (
    <View style={[styles.tabContent, { backgroundColor: theme.background }]}>
      <FlatList
        data={MY_BLOOD_REQUESTS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RequestItem item={item} theme={theme} />}
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
        data={OTHERS_BLOOD_REQUESTS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RequestItem item={item} theme={theme} />}
      />
    </View>
  );
};

// --- MAIN EXPORT ---

const Donate = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Blood Requests</Text>
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
        <Tab.Screen name="For You" component={MyBloodScreen} />
        <Tab.Screen name="All Requests" component={OthersBloodScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Donate;

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 28, fontWeight: '800' },
  tabContent: { flex: 1, padding: 12 },
  requestCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  requestHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  bloodTypeCircle: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 2,
  },
  bloodTypeText: { fontWeight: '900', fontSize: 18 },
  requestInfo: { flex: 1, justifyContent: 'center' },
  nameText: { fontSize: 16, fontWeight: '800', marginBottom: 3 },
  hospitalText: { fontSize: 12, marginTop: 2 },
  urgencyBadge: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  urgencyText: { fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
  requestDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  detailItem: { 
    alignItems: 'center',
    flex: 1,
  },
  detailText: { fontSize: 12, marginTop: 6, fontWeight: '600' },
  actionButtons: { flexDirection: 'row', gap: 12, height: 50, alignItems: 'center' },
  declineButton: { 
    flex: 1, 
    height: '100%', 
    borderRadius: 14, 
    borderWidth: 2,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  declineButtonText: { fontSize: 15, fontWeight: '800' },
  acceptButton: { 
    flex: 1, 
    height: '100%', 
    borderRadius: 14, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  acceptButtonText: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  acceptedContainer: { 
    flex: 1, 
    height: '100%', 
    borderRadius: 14, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16,
    borderWidth: 2,
  },
  acceptedContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  acceptedText: { fontSize: 14, fontWeight: '800' },
  undoButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5 },
  undoButtonText: { fontSize: 13, fontWeight: '800' },
  finalizedContainer: { 
    flex: 1, 
    height: '100%', 
    borderRadius: 14, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 10,
    borderWidth: 2,
  },
  finalizedText: { fontWeight: '900', fontSize: 15 },
});