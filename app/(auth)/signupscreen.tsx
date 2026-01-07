import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme
} from 'react-native';

const SignupScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    // State for input fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = () => {
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        router.replace('/(main)');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView 
                    contentContainerStyle={styles.scrollInner} 
                    showsVerticalScrollIndicator={false}
                >
                    {/* Brand Header */}
                    <View style={styles.headerContainer}>
                        <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
                            <MaterialCommunityIcons name="water-plus" size={50} color={theme.primary} />
                        </View>
                        <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
                        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
                            Join the community of lifesavers
                        </Text>
                    </View>

                    {/* Full Name Input */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.text }]}>Full Name</Text>
                        <View style={[styles.inputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
                            <Ionicons name="person-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: theme.text }]}
                                placeholder="Rahul Sharma"
                                placeholderTextColor={theme.placeholder}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.text }]}>Email Address</Text>
                        <View style={[styles.inputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
                            <Ionicons name="mail-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: theme.text }]}
                                placeholder="name@example.com"
                                placeholderTextColor={theme.placeholder}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.text }]}>Password</Text>
                        <View style={[styles.inputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
                            <Ionicons name="lock-closed-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: theme.text }]}
                                placeholder="Min. 8 characters"
                                placeholderTextColor={theme.placeholder}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.text }]}>Confirm Password</Text>
                        <View style={[styles.inputWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
                            <Ionicons name="shield-checkmark-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: theme.text }]}
                                placeholder="Repeat your password"
                                placeholderTextColor={theme.placeholder}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    {/* Signup Button */}
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: theme.primary }]} 
                        onPress={handleSignup}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>

                    {/* Back to Login */}
                    <TouchableOpacity onPress={() => router.back()} style={styles.footer}>
                        <Text style={[styles.linkText, { color: theme.textMuted }]}>
                            Already have an account? <Text style={[styles.linkBold, { color: theme.primary }]}>Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollInner: {
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 40,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 35,
    },
    iconCircle: {
        width: 85,
        height: 85,
        borderRadius: 42.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    button: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    footer: {
        marginTop: 25,
        marginBottom: 20,
    },
    linkText: {
        textAlign: 'center',
        fontSize: 15,
    },
    linkBold: {
        fontWeight: '800',
    },
});

export default SignupScreen;