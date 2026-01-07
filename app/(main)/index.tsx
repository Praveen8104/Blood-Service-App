import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for urgent requests
const URGENT_REQUESTS = [
  { id: '1', hospital: 'City Hospital', bloodType: 'O+', distance: '2.4km' },
  { id: '2', hospital: 'Red Cross Center', bloodType: 'AB-', distance: '5.1km' },
  { id: '3', hospital: 'General Clinic', bloodType: 'A+', distance: '0.8km' },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Rahul</Text>
            <Text style={styles.subGreeting}>Your blood can save a life today</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Blood Group Stats / User Status */}
        <View style={styles.statCard}>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Your Blood Type</Text>
            <Text style={styles.bloodGroup}>B+</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Last Donated</Text>
            <Text style={styles.statValue}>2 Months ago</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFEDED' }]}>
            <MaterialCommunityIcons name="hand-heart" size={32} color="#E21B1B" />
            <Text style={[styles.actionText, { color: '#E21B1B' }]}>Donate</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E8F2FF' }]}>
            <MaterialCommunityIcons name="ambulance" size={32} color="#007AFF" />
            <Text style={[styles.actionText, { color: '#007AFF' }]}>Request</Text>
          </TouchableOpacity>
        </View>

        {/* Urgent Requests Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Urgent Requests</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={URGENT_REQUESTS}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.urgentList}
          renderItem={({ item }) => (
            <View style={styles.requestCard}>
              <View style={styles.bloodBadge}>
                <Text style={styles.bloodBadgeText}>{item.bloodType}</Text>
              </View>
              <Text style={styles.hospitalName} numberOfLines={1}>{item.hospital}</Text>
              <Text style={styles.distanceText}>{item.distance} away</Text>
              <TouchableOpacity style={styles.helpButton}>
                <Text style={styles.helpButtonText}>Donate Now</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Awareness Banner */}
        <TouchableOpacity style={styles.banner}>
          <Ionicons name="information-circle" size={24} color="#FFF" />
          <Text style={styles.bannerText}>How many lives can one donation save? Learn more.</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
  },
  notificationBtn: {
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 10,
    height: 10,
    backgroundColor: '#E21B1B',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  statCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    marginBottom: 25,
  },
  statInfo: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  bloodGroup: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E21B1B',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#EEE',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    width: '47%',
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    marginTop: 8,
    fontWeight: '700',
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAll: {
    color: '#007AFF',
    fontWeight: '600',
  },
  urgentList: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  requestCard: {
    backgroundColor: '#FFF',
    width: 160,
    padding: 15,
    borderRadius: 16,
    marginRight: 15,
    elevation: 3,
    alignItems: 'center',
  },
  bloodBadge: {
    backgroundColor: '#FFEDED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 10,
  },
  bloodBadgeText: {
    color: '#E21B1B',
    fontWeight: 'bold',
  },
  hospitalName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  helpButton: {
    backgroundColor: '#E21B1B',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  helpButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#E21B1B',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  bannerText: {
    color: '#FFF',
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
});