import AsyncStorage from '@react-native-async-storage/async-storage'

// Save user session
export const saveSession = async (user) => {
    try {
        await AsyncStorage.setItem('userSession', JSON.stringify(user))
    } catch (error) {
        console.error('Error saving session:', error)
    }
}

// Retrieve user session
export const getSession = async () => {
    try {
        const session = await AsyncStorage.getItem('userSession')
        return session ? JSON.parse(session) : null
    } catch (error) {
        console.error('Error retrieving session:', error)
    }
}

// Remove user session (e.g., on logout)
export const removeSession = async () => {
    try {
        await AsyncStorage.removeItem('userSession')
    } catch (error) {
        console.error('Error removing session:', error)
    }
}
