import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
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
            <Text style={styles.title}>{user}</Text>

            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 20, marginBottom: 20 },
})

export default UserPage
