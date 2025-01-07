import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { getSession, removeSession } from '../config/storageConfig'

const UserPage = ({ navigation }) => {
    const [user, setUser] = useState('')

    const handleSignOut = async () => {
        try {
            await removeSession()
            navigation.navigate('Auth')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const init = async () => {
            const user = await getSession()
            setUser(user?.username)
        }
        init()
    }, [])

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>User</Text>
            </View>

            <Text style={styles.title}>{user}</Text>

            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 16,
        backgroundColor: '#3498db',
        borderRadius: 12,
        marginBottom: 16,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
        overflow: 'hidden', // Ensure content respects boundaries
        maxHeight: 'calc(100vh - 64px)',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        backgroundColor: '#3498db', // Change color here
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, // Makes the button rounded
        margin: 'auto',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default UserPage
