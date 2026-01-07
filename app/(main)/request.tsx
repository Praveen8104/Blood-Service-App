import { Colors } from '@/constants/Colors'; // Ensure your path is correct
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const RequestScreen = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    // Form State
    const [formData, setFormData] = useState({
        patientName: '',
        bloodGroup: '',
        units: '',
        hospitalName: '',
        contactNumber: '',
        note: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        // Basic Validation
        if (!formData.patientName || !formData.bloodGroup || !formData.hospitalName) {
            alert("Please fill in the required fields");
            return;
        }

        // Console the form data as requested
        console.log("--- New Blood Request ---");
        console.log(JSON.stringify(formData, null, 2));

        alert("Request Submitted Successfully!");

        // Reset form
        setFormData({
            patientName: '',
            bloodGroup: '',
            units: '',
            hospitalName: '',
            contactNumber: '',
            note: '',
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    <View style={styles.header}>
                        <Text style={[styles.title, { color: theme.text }]}>Request Blood</Text>
                        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
                            Fill in the details to post an urgent requirement.
                        </Text>
                    </View>

                    {/* Patient Name */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.text }]}>Patient Name *</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
                            placeholder="Full Name"
                            placeholderTextColor={theme.placeholder}
                            value={formData.patientName}
                            onChangeText={(val) => handleInputChange('patientName', val)}
                        />
                    </View>

                    {/* Blood Group Selector */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.text }]}>Blood Group Required *</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bloodSelector}>
                            {BLOOD_GROUPS.map((group) => (
                                <TouchableOpacity
                                    key={group}
                                    onPress={() => handleInputChange('bloodGroup', group)}
                                    style={[
                                        styles.bloodOption,
                                        { backgroundColor: theme.card, borderColor: theme.border },
                                        formData.bloodGroup === group && { backgroundColor: theme.primary, borderColor: theme.primary }
                                    ]}
                                >
                                    <Text style={[
                                        styles.bloodOptionText,
                                        { color: theme.text },
                                        formData.bloodGroup === group && { color: theme.white }
                                    ]}>
                                        {group}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.row}>
                        {/* Units Required */}
                        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                            <Text style={[styles.label, { color: theme.text }]}>Units (ml)</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
                                placeholder="Ex: 1"
                                placeholderTextColor={theme.placeholder}
                                keyboardType="numeric"
                                value={formData.units}
                                onChangeText={(val) => handleInputChange('units', val)}
                            />
                        </View>
                        {/* Contact */}
                        <View style={[styles.inputGroup, { flex: 2 }]}>
                            <Text style={[styles.label, { color: theme.text }]}>Contact Number</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
                                placeholder="Mobile Number"
                                placeholderTextColor={theme.placeholder}
                                keyboardType="phone-pad"
                                value={formData.contactNumber}
                                onChangeText={(val) => handleInputChange('contactNumber', val)}
                            />
                        </View>
                    </View>

                    {/* Hospital Name */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.text }]}>Hospital & Location *</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
                            placeholder="Name of the Hospital"
                            placeholderTextColor={theme.placeholder}
                            value={formData.hospitalName}
                            onChangeText={(val) => handleInputChange('hospitalName', val)}
                        />
                    </View>

                    {/* Note */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.text }]}>Additional Note</Text>
                        <TextInput
                            style={[
                                styles.input,
                                styles.textArea,
                                { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }
                            ]}
                            placeholder="Any specific instructions..."
                            placeholderTextColor={theme.placeholder}
                            multiline
                            numberOfLines={4}
                            value={formData.note}
                            onChangeText={(val) => handleInputChange('note', val)}
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={[styles.submitButton, { backgroundColor: theme.secondary }]} onPress={handleSubmit}>
                        <MaterialCommunityIcons name="send" size={20} color={theme.white} style={{ marginRight: 8 }} />
                        <Text style={[styles.submitButtonText, { color: theme.white }]}>Post Request</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RequestScreen;

const styles = StyleSheet.create({
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        paddingTop: 15,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
    },
    bloodSelector: {
        flexDirection: 'row',
        marginTop: 5,
    },
    bloodOption: {
        width: 55,
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
    },
    bloodOptionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    submitButton: {
        height: 60,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});