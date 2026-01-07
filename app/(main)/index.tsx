import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useColorScheme
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors'; // Use your actual path

const URGENT_REQUESTS = [
    { id: '1', hospital: 'City Hospital', bloodType: 'O+', distance: '2.4km' },
    { id: '2', hospital: 'Red Cross Center', bloodType: 'AB-', distance: '5.1km' },
    { id: '3', hospital: 'General Clinic', bloodType: 'A+', distance: '0.8km' },
];

const HomeScreen = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.greeting, { color: theme.text }]}>Hello, Praveen</Text>
                        <Text style={[styles.subGreeting, { color: theme.textMuted }]}>Your blood can save a life today</Text>
                    </View>
                    <TouchableOpacity style={[styles.notificationBtn, { backgroundColor: theme.card }]}>
                        <Ionicons name="notifications-outline" size={24} color={theme.icon} />
                        <View style={[styles.badge, { backgroundColor: theme.primary, borderColor: theme.card }]} />
                    </TouchableOpacity>
                </View>

                {/* Blood Group Stats */}
                <View style={[styles.statCard, { backgroundColor: theme.card }]}>
                    <View style={styles.statInfo}>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Your Blood Type</Text>
                        <Text style={[styles.bloodGroup, { color: theme.primary }]}>B+</Text>
                    </View>
                    <View style={[styles.verticalDivider, { backgroundColor: theme.background }]} />
                    <View style={styles.statInfo}>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Last Donated</Text>
                        <Text style={[styles.statValue, { color: theme.text }]}>2 Months ago</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionContainer}>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.primaryLight }]}>
                        <MaterialCommunityIcons name="hand-heart" size={32} color={theme.primary} />
                        <Text style={[styles.actionText, { color: theme.primary }]}>Donate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.secondaryLight }]}>
                        <MaterialCommunityIcons name="ambulance" size={32} color={theme.secondary} />
                        <Text style={[styles.actionText, { color: theme.secondary }]}>Request</Text>
                    </TouchableOpacity>
                </View>

                {/* Urgent Requests Section */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Urgent Requests</Text>
                    <TouchableOpacity><Text style={[styles.seeAll, { color: theme.secondary }]}>See All</Text></TouchableOpacity>
                </View>

                <FlatList
                    horizontal
                    data={URGENT_REQUESTS}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.urgentList}
                    renderItem={({ item }) => (
                        <View style={[styles.requestCard, { backgroundColor: theme.card }]}>
                            <View style={[styles.bloodBadge, { backgroundColor: theme.primaryLight }]}>
                                <Text style={[styles.bloodBadgeText, { color: theme.primary }]}>{item.bloodType}</Text>
                            </View>
                            <Text style={[styles.hospitalName, { color: theme.text }]} numberOfLines={1}>{item.hospital}</Text>
                            <Text style={[styles.distanceText, { color: theme.textMuted }]}>{item.distance} away</Text>
                            <TouchableOpacity style={[styles.helpButton, { backgroundColor: theme.primary }]}>
                                <Text style={[styles.helpButtonText, { color: theme.white }]}>Donate Now</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                {/* Awareness Banner */}
                <TouchableOpacity style={[styles.banner, { backgroundColor: theme.primary }]}>
                    <Ionicons name="information-circle" size={24} color={theme.white} />
                    <Text style={[styles.bannerText, { color: theme.white }]}>How many lives can one donation save? Learn more.</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20,
    },
    greeting: { fontSize: 22, fontWeight: 'bold' },
    subGreeting: { fontSize: 14 },
    notificationBtn: {
        padding: 8,
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
        borderRadius: 5,
        borderWidth: 2,
    },
    statCard: {
        flexDirection: 'row',
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 20,
        elevation: 2,
        marginBottom: 25,
    },
    statInfo: { flex: 1, alignItems: 'center' },
    statLabel: { fontSize: 12, marginBottom: 4 },
    bloodGroup: { fontSize: 24, fontWeight: 'bold' },
    statValue: { fontSize: 16, fontWeight: '600' },
    verticalDivider: { width: 1 },
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
    actionText: { marginTop: 8, fontWeight: '700', fontSize: 16 },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: { fontSize: 18, fontWeight: 'bold' },
    seeAll: { fontWeight: '600' },
    urgentList: { paddingLeft: 20, paddingBottom: 20 },
    requestCard: {
        width: 160,
        padding: 15,
        borderRadius: 16,
        marginRight: 15,
        elevation: 3,
        alignItems: 'center',
    },
    bloodBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 10,
    },
    bloodBadgeText: { fontWeight: 'bold' },
    hospitalName: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
    distanceText: { fontSize: 12, marginBottom: 12 },
    helpButton: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    helpButtonText: { fontSize: 12, fontWeight: 'bold' },
    banner: {
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    bannerText: { marginLeft: 10, flex: 1, fontSize: 14, fontWeight: '500' },
});