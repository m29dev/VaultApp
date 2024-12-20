import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const HomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>VAULT</Text>

            {/* if not auth */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Auth')}
            >
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* if auth */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('User')}
            >
                <Text style={styles.buttonText}>User</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Wallet')}
            >
                <Text style={styles.buttonText}>Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CurrencyExchange')}
            >
                <Text style={styles.buttonText}>Currency Exchange</Text>
            </TouchableOpacity>
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default HomePage
