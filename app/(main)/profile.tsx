import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const router = useRouter();

    const [isAvailable, setIsAvailable] = useState(true);

    const handleLogout = () => {
        router.replace('/(auth)/loginscreen');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header: User Identity */}
                <View style={styles.header}>
                    <View style={[styles.imageContainer, { borderColor: theme.primary }]}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?u=praveenreddygoli8' }}
                            style={styles.profileImage}
                        />
                        <View style={[styles.bloodTypeBadge, { backgroundColor: theme.primary }]}>
                            <Text style={styles.bloodTypeText}>B+</Text>
                        </View>
                    </View>
                    <Text style={[styles.userName, { color: theme.text }]}>Praveen Reddy</Text>
                    <View style={styles.locationRow}>
                        <Ionicons name="location" size={14} color={theme.primary} />
                        <Text style={[styles.locationText, { color: theme.textMuted }]}>Kakinada, AP</Text>
                    </View>
                </View>

                {/* Donor Achievement Card */}
                <View style={[styles.achievementCard, { backgroundColor: theme.primary }]}>
                    <View style={styles.achievementInfo}>
                        <Text style={styles.achievementTitle}>Silver Donor</Text>
                        <Text style={styles.achievementSub}>2 donations away from Gold</Text>
                    </View>
                    <MaterialCommunityIcons name="medal" size={40} color="#FFD700" />
                </View>

                {/* Impact Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={[styles.statItem, { backgroundColor: theme.card }]}>
                        <MaterialCommunityIcons name="water" size={24} color={theme.primary} />
                        <Text style={[styles.statValue, { color: theme.text }]}>04</Text>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Donations</Text>
                    </View>
                    <View style={[styles.statItem, { backgroundColor: theme.card }]}>
                        <MaterialCommunityIcons name="heart-pulse" size={24} color={theme.secondary} />
                        <Text style={[styles.statValue, { color: theme.text }]}>12</Text>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Lives Saved</Text>
                    </View>
                    <View style={[styles.statItem, { backgroundColor: theme.card }]}>
                        <MaterialCommunityIcons name="calendar-check" size={24} color="#FFB100" />
                        <Text style={[styles.statValue, { color: theme.text }]}>Jan 15</Text>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Last Post</Text>
                    </View>
                </View>

                {/* Availability Section */}
                <View style={[styles.section, { backgroundColor: theme.card }]}>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
                                <MaterialCommunityIcons name="map-marker-radius" size={22} color={theme.primary} />
                            </View>
                            <View style={{ marginLeft: 12 }}>
                                <Text style={[styles.rowTitle, { color: theme.text }]}>Active Donor Status</Text>
                                <Text style={[styles.rowSub, { color: theme.textMuted }]}>Visible on nearby map</Text>
                            </View>
                        </View>
                        <Switch
                            value={isAvailable}
                            onValueChange={setIsAvailable}
                            trackColor={{ false: '#767577', true: theme.primaryLight }}
                            thumbColor={isAvailable ? theme.primary : '#f4f3f4'}
                        />
                    </View>
                </View>

                {/* Settings Menu */}
                <View style={[styles.section, { backgroundColor: theme.card, marginTop: 15 }]}>
                    <SettingItem 
                        icon="person-outline" 
                        title="Personal Information" 
                        theme={theme} 
                        onPress={() => router.push('/editprofile')} 
                    />
                    <SettingItem 
                        icon="medical-outline" 
                        title="Health Report" 
                        theme={theme} 
                    />
                    <SettingItem 
                        icon="time-outline" 
                        title="Donation Schedule" 
                        theme={theme} 
                    />
                    <SettingItem 
                        icon="settings-outline" 
                        title="App Settings" 
                        theme={theme} 
                    />
                    
                    <TouchableOpacity 
                        style={styles.logoutBtn} 
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out-outline" size={22} color={theme.primary} />
                        <Text style={[styles.logoutText, { color: theme.primary }]}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const SettingItem = ({ icon, title, theme, onPress }: any) => (
    <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.background }]} onPress={onPress}>
        <View style={styles.rowLabel}>
            <Ionicons name={icon} size={20} color={theme.text} />
            <Text style={[styles.menuText, { color: theme.text }]}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
    </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 25,
    },
    imageContainer: {
        width: 100,
        height: 100,
        position: 'relative',
        marginBottom: 15,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    bloodTypeBadge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 3,
        borderColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bloodTypeText: {
        color: '#FFF',
        fontWeight: '900',
        fontSize: 12,
    },
    userName: {
        fontSize: 22,
        fontWeight: '800',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        fontSize: 13,
        marginLeft: 4,
    },
    achievementCard: {
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
            android: { elevation: 5 },
        }),
    },
    achievementInfo: {
        flex: 1,
    },
    achievementTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    achievementSub: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 2,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    statItem: {
        width: '31%',
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 11,
        marginTop: 2,
    },
    section: {
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
    },
    rowLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowTitle: {
        fontSize: 15,
        fontWeight: '700',
    },
    rowSub: {
        fontSize: 11,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    menuText: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 12,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 8,
    },
});