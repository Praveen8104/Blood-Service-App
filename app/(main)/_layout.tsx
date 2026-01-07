import { Ionicons } from '@expo/vector-icons'; // Built into Expo
import { Tabs } from 'expo-router';

export default function MainLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
            <Tabs.Screen
                name="index"
                options={{ title: 'Home', headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }}
            />
            <Tabs.Screen
                name="donate"
                options={{ title: 'Donate', headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} /> }}
            />
            <Tabs.Screen
                name="request"
                options={{ title: 'Request', headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} /> }}
            />
            <Tabs.Screen
                name="donors"
                options={{ title: 'Donors', headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} /> }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: 'Profile', headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }}
            />
        </Tabs>
    );
}