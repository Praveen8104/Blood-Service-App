import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NotificationType = 'urgent' | 'donation' | 'reminder' | 'info';

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    read: boolean;
}

const NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        type: 'urgent',
        title: 'Urgent Blood Request',
        message: 'City Hospital needs O+ blood urgently. Help save a life!',
        timestamp: '5 mins ago',
        icon: 'alert-circle',
        read: false,
    },
    {
        id: '2',
        type: 'donation',
        title: 'Thank You for Donating',
        message: 'Your donation on Jan 15 helped save 3 lives. Thank you!',
        timestamp: '1 day ago',
        icon: 'heart',
        read: true,
    },
    {
        id: '3',
        type: 'reminder',
        title: 'Donation Reminder',
        message: 'You can donate again now. Your body has recovered. Book a slot!',
        timestamp: '2 days ago',
        icon: 'calendar-check',
        read: true,
    },
    {
        id: '4',
        type: 'urgent',
        title: 'Emergency Blood Needed',
        message: 'Red Cross Center urgently needs AB- blood. 10km from you.',
        timestamp: '3 days ago',
        icon: 'alert-circle',
        read: true,
    },
    {
        id: '5',
        type: 'info',
        title: 'Camp Near You',
        message: 'Blood donation camp organized at Central Mall on Jan 25.',
        timestamp: '1 week ago',
        icon: 'information',
        read: true,
    },
];

const NotificationsScreen = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const router = useRouter();
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'urgent':
                return theme.primary;
            case 'donation':
                return '#FF69B4';
            case 'reminder':
                return theme.secondary;
            case 'info':
            default:
                return theme.textMuted;
        }
    };

    const renderNotification = ({ item }: { item: Notification }) => (
        <TouchableOpacity
            style={[
                styles.notificationItem,
                {
                    backgroundColor: item.read ? theme.card : theme.primaryLight,
                    borderLeftColor: getNotificationColor(item.type),
                }
            ]}
            onPress={() => markAsRead(item.id)}
        >
            <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(item.type) }]}>
                <MaterialCommunityIcons name={item.icon} size={20} color="#FFFFFF" />
            </View>

            <View style={styles.contentContainer}>
                <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.message, { color: theme.textMuted }]}>{item.message}</Text>
                <Text style={[styles.timestamp, { color: theme.textMuted }]}>{item.timestamp}</Text>
            </View>

            {!item.read && (
                <View style={[styles.unreadDot, { backgroundColor: theme.primary }]} />
            )}

            <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteNotification(item.id)}
            >
                <Ionicons name="close" size={20} color={theme.textMuted} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right', 'bottom']}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Notifications</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Notifications List */}
            {notifications.length > 0 ? (
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="notifications-off" size={64} color={theme.textMuted} />
                    <Text style={[styles.emptyTitle, { color: theme.text }]}>No Notifications</Text>
                    <Text style={[styles.emptyMessage, { color: theme.textMuted }]}>
                        You're all caught up! Check back later for updates.
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        borderLeftWidth: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    message: {
        fontSize: 14,
        marginBottom: 6,
        lineHeight: 20,
    },
    timestamp: {
        fontSize: 12,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
    },
    deleteBtn: {
        padding: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
    },
    emptyMessage: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
    },
});
