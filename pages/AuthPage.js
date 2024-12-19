import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { postSignIn, postSignUp } from '../config/vaultServerApi'
import { saveSession } from '../config/storageConfig'

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')

    const handleLogin = async () => {
        try {
            const data = await postSignIn(username, password)
            // const data = await response.json()
            console.log(data)
            await saveSession(data)
            setMessage(`Login successful: ${data}`)
            navigation.navigate('Home')
        } catch (error) {
            console.error('Error:', error)
            setMessage('Login failed')
        }
    }

    const handleRegister = async () => {
        try {
            const data = await postSignUp(username, password)
            // const data = await response.json()

            console.log(data)
            await saveSession(data)
            setMessage(`Register successful: ${data}`)
            navigation.navigate('Home')
        } catch (error) {
            console.error('Error:', error)
            setMessage('Registration failed')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button
                title={isLogin ? 'Login' : 'Register'}
                onPress={isLogin ? handleLogin : handleRegister}
            />

            {message ? <Text style={styles.message}>{message}</Text> : null}

            <TouchableOpacity
                onPress={() => setIsLogin(!isLogin)}
                style={styles.toggleContainer}
            >
                <Text style={styles.toggleText}>
                    {isLogin
                        ? "Don't have an account? Register"
                        : 'Already have an account? Login'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    message: {
        marginTop: 15,
        fontSize: 16,
        textAlign: 'center',
        color: 'green',
    },
    toggleContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    toggleText: {
        color: '#007BFF',
        fontSize: 16,
    },
})

export default AuthPage
