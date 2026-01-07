import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    useColorScheme
} from 'react-native';

const LoginScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email && password) {
            router.replace('/(main)');
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    
                    {/* Brand Icon / Logo */}
                    <View style={styles.logoContainer}>
                        <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
                            <MaterialCommunityIcons name="water" size={60} color={theme.primary} />
                        </View>
                        <Text style={[styles.brandName, { color: theme.primary }]}>LifeStream</Text>
                    </View>

                    <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
                    <Text style={[styles.subtitle, { color: theme.textMuted }]}>Sign in to save lives today</Text>

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
                                placeholder="••••••••"
                                placeholderTextColor={theme.placeholder}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity style={styles.forgotBtn}>
                        <Text style={[styles.forgotText, { color: theme.primary }]}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: theme.primary }]} 
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <TouchableOpacity onPress={() => router.push('/(auth)/signupscreen')} style={styles.footer}>
                        <Text style={[styles.linkText, { color: theme.textMuted }]}>
                            New here? <Text style={[styles.linkBold, { color: theme.primary }]}>Create Account</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    brandName: {
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 18,
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
    forgotBtn: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    forgotText: {
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    linkText: {
        textAlign: 'center',
        fontSize: 15,
    },
    linkBold: {
        fontWeight: '800',
    },
});

export default LoginScreen;