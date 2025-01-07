import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import CurrencyExchangePage from './pages/CurrencyExchangePage'
import WalletPage from './pages/WalletPage'
import CurrenciesPage from './pages/CurrenciesPage'

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    title: '',
                }}
            >
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Auth" component={AuthPage} />
                <Stack.Screen name="User" component={UserPage} />
                <Stack.Screen
                    name="CurrencyExchange"
                    component={CurrencyExchangePage}
                />
                <Stack.Screen name="Wallet" component={WalletPage} />
                <Stack.Screen name="Currencies" component={CurrenciesPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
