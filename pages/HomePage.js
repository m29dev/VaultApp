import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getSession } from '../config/storageConfig'

const HomePage = ({ navigation }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log('on init check user')

        const user = async () => {
            const res = await getSession()
            if (!res) return
            console.log(res)
            setUser(res)
        }
        user()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VAULT</Text>

            {/* if not auth */}
            {!user && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Auth')}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            )}

            {/* if auth */}
            {user && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('User')}
                >
                    <Text style={styles.buttonText}>User</Text>
                </TouchableOpacity>
            )}

            {user && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Wallet')}
                >
                    <Text style={styles.buttonText}>Wallet</Text>
                </TouchableOpacity>
            )}

            {user && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('CurrencyExchange')}
                >
                    <Text style={styles.buttonText}>Currency Exchange</Text>
                </TouchableOpacity>
            )}

            {user && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Currencies')}
                >
                    <Text style={styles.buttonText}>Currencies</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 20, marginBottom: 20 },
    button: {
        backgroundColor: '#3498db', // Change color here
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, // Makes the button rounded
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default HomePage
