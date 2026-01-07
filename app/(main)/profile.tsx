import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
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

    // State for "Available to Donate" toggle
    const [isAvailable, setIsAvailable] = useState(true);

    const handleLogout = () => {
        // Navigate back to auth group
        router.replace('/(auth)/loginscreen');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={[styles.imageContainer, { borderColor: theme.primary }]}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?u=praveenreddygoli8' }}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={[styles.editIcon, { backgroundColor: theme.primary }]}>
                            <Ionicons name="camera" size={16} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.userName, { color: theme.text }]}>Praveen Reddy</Text>
                    <Text style={[styles.userEmail, { color: theme.textMuted }]}>praveenreddygoli8@gmail.com</Text>
                </View>

                {/* Impact Stats */}
                <View style={styles.statsContainer}>
                    <View style={[styles.statBox, { backgroundColor: theme.card }]}>
                        <Text style={[styles.statNumber, { color: theme.primary }]}>04</Text>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Donations</Text>
                    </View>
                    <View style={[styles.statBox, { backgroundColor: theme.card }]}>
                        <Text style={[styles.statNumber, { color: theme.secondary }]}>12</Text>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Lives Saved</Text>
                    </View>
                    <View style={[styles.statBox, { backgroundColor: theme.card }]}>
                        <Text style={[styles.statNumber, { color: '#FFB100' }]}>B+</Text>
                        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Group</Text>
                    </View>
                </View>

                {/* Availability Toggle */}
                <View style={[styles.section, { backgroundColor: theme.card }]}>
                    <View style={styles.settingsRow}>
                        <View style={styles.settingsLabelGroup}>
                            <MaterialCommunityIcons name="map-marker-radius" size={24} color={theme.primary} />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={[styles.settingsTitle, { color: theme.text }]}>Available to Donate</Text>
                                <Text style={[styles.settingsSub, { color: theme.textMuted }]}>Show your location to seekers</Text>
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

                {/* Settings Options */}
                <View style={[styles.section, { backgroundColor: theme.card, marginTop: 20 }]}>
                    <SettingItem icon="person-outline" title="Edit Profile" theme={theme} />
                    <SettingItem icon="document-text-outline" title="Donation History" theme={theme} />
                    <SettingItem icon="shield-checkmark-outline" title="Medical Records" theme={theme} />
                    <SettingItem icon="notifications-outline" title="Notification Settings" theme={theme} />

                    <TouchableOpacity
                        style={[styles.logoutBtn, { borderTopColor: theme.border }]}
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out-outline" size={24} color={theme.primary} />
                        <Text style={[styles.logoutText, { color: theme.primary }]}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

// Helper component for settings rows
const SettingItem = ({ icon, title, theme }: { icon: any, title: string, theme: any }) => (
    <TouchableOpacity style={[styles.settingsRow, { borderBottomWidth: 1, borderBottomColor: theme.background }]}>
        <View style={styles.settingsLabelGroup}>
            <Ionicons name={icon} size={22} color={theme.text} />
            <Text style={[styles.settingsTitle, { color: theme.text, marginLeft: 15 }]}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />
    </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    imageContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        padding: 3,
        marginBottom: 15,
        position: 'relative',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 55,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    statBox: {
        width: '30%',
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
        marginTop: 4,
    },
    section: {
        marginHorizontal: 20,
        borderRadius: 20,
        paddingVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    settingsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    settingsLabelGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    settingsSub: {
        fontSize: 12,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginTop: 10,
        borderTopWidth: 1,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});