import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfileScreen = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const router = useRouter();

    // Original values
    const originalValues = {
        firstName: 'Praveen',
        lastName: 'Reddy',
        email: 'praveenreddygoli8@gmail.com',
        phone: '+91 9876543210',
        bloodGroup: 'B+',
        address: '123 Main Street, City, State 12345',
    };

    // Form state
    const [firstName, setFirstName] = useState(originalValues.firstName);
    const [lastName, setLastName] = useState(originalValues.lastName);
    const [email, setEmail] = useState(originalValues.email);
    const [phone, setPhone] = useState(originalValues.phone);
    const [bloodGroup, setBloodGroup] = useState(originalValues.bloodGroup);
    const [address, setAddress] = useState(originalValues.address);
    const [isSaving, setIsSaving] = useState(false);

    // Check if there are changes
    const hasChanges = 
        firstName !== originalValues.firstName ||
        lastName !== originalValues.lastName ||
        email !== originalValues.email ||
        phone !== originalValues.phone ||
        bloodGroup !== originalValues.bloodGroup ||
        address !== originalValues.address;

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            router.back();
        }, 1000);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right', 'bottom']}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Edit Profile</Text>
                <TouchableOpacity 
                    onPress={handleSave}
                    disabled={!hasChanges || isSaving}
                    style={{ opacity: hasChanges && !isSaving ? 1 : 0.5 }}
                >
                    <Ionicons 
                        name="checkmark" 
                        size={28} 
                        color={hasChanges && !isSaving ? theme.primary : theme.textMuted}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {/* First Name */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.text }]}>First Name</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: theme.card,
                                color: theme.text,
                                borderColor: theme.border,
                            }
                        ]}
                        placeholder="Enter first name"
                        placeholderTextColor={theme.placeholder}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>

                {/* Last Name */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.text }]}>Last Name</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: theme.card,
                                color: theme.text,
                                borderColor: theme.border,
                            }
                        ]}
                        placeholder="Enter last name"
                        placeholderTextColor={theme.placeholder}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>

                {/* Email */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.text }]}>Email</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: theme.card,
                                color: theme.text,
                                borderColor: theme.border,
                            }
                        ]}
                        placeholder="Enter email"
                        placeholderTextColor={theme.placeholder}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                {/* Phone */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.text }]}>Phone Number</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: theme.card,
                                color: theme.text,
                                borderColor: theme.border,
                            }
                        ]}
                        placeholder="Enter phone number"
                        placeholderTextColor={theme.placeholder}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Blood Group */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.text }]}>Blood Group</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: theme.card,
                                color: theme.text,
                                borderColor: theme.border,
                            }
                        ]}
                        placeholder="e.g., B+"
                        placeholderTextColor={theme.placeholder}
                        value={bloodGroup}
                        onChangeText={setBloodGroup}
                    />
                </View>

                {/* Address */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.text }]}>Address</Text>
                    <TextInput
                        style={[
                            styles.input,
                            styles.textArea,
                            {
                                backgroundColor: theme.card,
                                color: theme.text,
                                borderColor: theme.border,
                            }
                        ]}
                        placeholder="Enter your address"
                        placeholderTextColor={theme.placeholder}
                        value={address}
                        onChangeText={setAddress}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                {/* Cancel Button */}
                <TouchableOpacity
                    style={[styles.cancelBtn, { borderColor: theme.border }]}
                    onPress={() => router.back()}
                    disabled={isSaving}
                >
                    <Text style={[styles.cancelBtnText, { color: theme.text }]}>Cancel</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;

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
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
    },
    textArea: {
        paddingVertical: 12,
        minHeight: 100,
    },
    cancelBtn: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 30,
        borderWidth: 1.5,
    },
    cancelBtnText: {
        fontSize: 18,
        fontWeight: '700',
    },
});
