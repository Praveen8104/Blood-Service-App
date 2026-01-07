import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Platform, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const DONORS_MOCK = [
    { id: '1', name: 'Rahul S.', type: 'B+', lat: 17.075, lng: 82.136, lastActive: '2 mins ago', phone: '+919876543210' },
    { id: '2', name: 'Anita K.', type: 'O-', lat: 17.009, lng: 81.780, lastActive: '1 hour ago', phone: '+919876543211' },
    { id: '3', name: 'Vijay P.', type: 'A+', lat: 16.970, lng: 82.227, lastActive: '10 mins ago', phone: '+919876543212' },
    { id: '4', name: 'Suresh V.', type: 'O+', lat: 17.088, lng: 82.066, lastActive: 'Active now', phone: '+919876543213' },
    { id: '5', name: 'Priya M.', type: 'AB+', lat: 17.051, lng: 82.132, lastActive: '5 mins ago', phone: '+919876543214' },
    { id: '6', name: 'Kiran D.', type: 'A-', lat: 17.000, lng: 81.777, lastActive: '3 hours ago', phone: '+919876543215' },
    { id: '7', name: 'Meena R.', type: 'B-', lat: 16.942, lng: 82.253, lastActive: 'Active now', phone: '+919876543216' },
    { id: '8', name: 'Abhishek T.', type: 'O-', lat: 17.112, lng: 82.258, lastActive: '12 mins ago', phone: '+919876543217' },
    { id: '9', name: 'Lakshmi C.', type: 'AB-', lat: 16.864, lng: 81.916, lastActive: '45 mins ago', phone: '+919876543218' },
    { id: '10', name: 'Naveen G.', type: 'B+', lat: 16.848, lng: 82.022, lastActive: '6 mins ago', phone: '+919876543219' },
];

const DonorsScreen = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const [search, setSearch] = useState('');
    const [selectedDonor, setSelectedDonor] = useState<typeof DONORS_MOCK[number] | null>(null);

    const handleContact = () => {
        if (!selectedDonor || !selectedDonor.phone) return;
        
        // Use telprompt for iOS to show a confirmation dialog, tel for Android
        const phoneNumber = Platform.OS === 'ios' 
            ? `telprompt:${selectedDonor.phone}` 
            : `tel:${selectedDonor.phone}`;

        Linking.openURL(phoneNumber).catch(() => {
            alert("Unable to open dialer. Make sure the app has Phone permissions.");
        });
    };

    const handleDirections = () => {
        if (!selectedDonor) return;
        const { lat, lng } = selectedDonor;
        
        // Fixed URL syntax for Google Maps
        const url = Platform.select({
            ios: `maps:0,0?q=${lat},${lng}`,
            android: `geo:0,0?q=${lat},${lng}(${selectedDonor.name})`,
            default: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
        });

        if (url) Linking.openURL(url);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <View style={styles.searchContainer}>
                <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <Ionicons name="search" size={20} color={theme.textMuted} />
                    <TextInput
                        placeholder="Search blood group (e.g. O+)"
                        placeholderTextColor={theme.placeholder}
                        style={[styles.searchInput, { color: theme.text }]}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.primary }]}>
                    <Ionicons name="options-outline" size={24} color={theme.white} />
                </TouchableOpacity>
            </View>

            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={StyleSheet.absoluteFillObject}
                    initialRegion={{
                        latitude: 17.05,
                        longitude: 82.1,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    userInterfaceStyle={colorScheme}
                    onPress={() => setSelectedDonor(null)}
                >
                    {DONORS_MOCK.filter(d => d.type.toLowerCase().includes(search.toLowerCase())).map((donor) => (
                        <Marker
                            key={donor.id}
                            coordinate={{ latitude: donor.lat, longitude: donor.lng }}
                            onPress={() => setSelectedDonor(donor)}
                        >
                            <View style={[styles.marker, { backgroundColor: theme.primary }]}>
                                <Text style={styles.markerText}>{donor.type}</Text>
                            </View>
                        </Marker>
                    ))}
                </MapView>

                {selectedDonor && (
                    <View style={[styles.infoCardContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <View style={styles.infoHeaderRow}>
                            <Text style={[styles.infoName, { color: theme.text }]}>{selectedDonor.name}</Text>
                            <TouchableOpacity onPress={() => setSelectedDonor(null)} style={styles.infoCloseBtn}>
                                <Ionicons name="close" size={24} color={theme.textMuted} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Blood Group</Text>
                            <Text style={[styles.infoValuePill, { backgroundColor: theme.primary }]}>{selectedDonor.type}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Status</Text>
                            <Text style={[styles.infoValue, { color: theme.text }]}>{selectedDonor.lastActive}</Text>
                        </View>
                        <View style={styles.infoActions}>
                            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: theme.primary }]} onPress={handleContact}>
                                <Ionicons name="call" size={18} color={theme.white} />
                                <Text style={styles.primaryBtnText}>Contact</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.secondaryBtn, { borderColor: theme.border }]} onPress={handleDirections}>
                                <Ionicons name="navigate" size={18} color={theme.text} />
                                <Text style={[styles.secondaryBtnText, { color: theme.text }]}>Directions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default DonorsScreen;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        padding: 15,
        zIndex: 10,
        position: 'absolute',
        top: Platform.OS === 'ios' ? 10 : 30,
        width: '100%',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        marginRight: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
    filterBtn: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    mapContainer: { ...StyleSheet.absoluteFillObject },
    marker: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    markerText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
    infoCardContainer: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 24,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
    },
    infoHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    infoCloseBtn: { padding: 4 },
    infoName: { fontSize: 18, fontWeight: '800' },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    infoLabel: { fontSize: 14 },
    infoValue: { fontSize: 14, fontWeight: '600' },
    infoValuePill: {
        color: '#FFF',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 8,
        overflow: 'hidden',
    },
    infoActions: { flexDirection: 'row', marginTop: 18 },
    primaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        flex: 1,
        marginRight: 8,
    },
    primaryBtnText: { color: '#FFF', fontWeight: '700', marginLeft: 8 },
    secondaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        flex: 1,
        marginLeft: 8,
    },
    secondaryBtnText: { fontWeight: '700', marginLeft: 8 },
});