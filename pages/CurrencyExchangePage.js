import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native'
import {
    getCurrency,
    getWallet,
    postCurrencyExchange,
} from '../config/vaultServerApi'

const CurrencyExchangePage = () => {
    const [userCurrencies, setUserCurrencies] = useState([])

    const [currentCurrency, setCurrentCurrency] = useState('PLN')
    const [newCurrency, setNewCurrency] = useState('EUR')
    const [amount, setAmount] = useState('')
    const [result, setResult] = useState('')
    const [message, setMessage] = useState('')

    const handleExchange = async () => {
        try {
            const data = await postCurrencyExchange(
                currentCurrency,
                newCurrency,
                amount
            )

            console.log(31, data)

            setResult(
                `You received: ${data.newCurrency.amount} ${data.newCurrency.currency}`
            )
        } catch (error) {
            console.error('Error:', error)
            setMessage('Exchange failed')
        }
    }

    const [rates, setRates] = useState([])
    useEffect(() => {
        const onInit = async () => {
            const userWallet = await getWallet()
            setUserCurrencies(userWallet)
        }
        onInit()

        const fetchCurrency = async () => {
            console.log('ON INIT, GET CURRENCY')
            const res = await getCurrency()
            const data = res?.[0]?.rates
            setRates(data)
            console.log(data)
        }
        fetchCurrency()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Currency Exchange</Text>

            {/* Current Currency Selector */}
            <Text style={styles.label}>Select Current Currency:</Text>
            <Picker
                selectedValue={currentCurrency}
                onValueChange={(itemValue) => setCurrentCurrency(itemValue)}
                style={styles.picker}
            >
                {userCurrencies.map((currency) => (
                    <Picker.Item
                        key={currency.code}
                        label={`${currency.currency} (${currency.code})`}
                        value={currency.code}
                    />
                ))}
            </Picker>
            <Text style={styles.info}>Current Balance: {currentCurrency}</Text>

            {/* New Currency Selector */}
            <Text style={styles.label}>Select New Currency:</Text>
            <Picker
                selectedValue={newCurrency}
                onValueChange={(itemValue) => setNewCurrency(itemValue)}
                style={styles.picker}
            >
                {rates
                    .filter((currency) => currency.code !== currentCurrency)
                    .map((currency) => (
                        <Picker.Item
                            key={currency.code}
                            label={`${currency.currency} (${currency.code})`}
                            value={currency.code}
                        />
                    ))}
            </Picker>

            {/* Amount Input */}
            <TextInput
                style={styles.input}
                placeholder="Amount to exchange"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            {/* Exchange Button */}
            <Button title="Exchange" onPress={handleExchange} />

            {/* Result Message */}
            {result ? <Text style={styles.result}>{result}</Text> : null}
            {message ? <Text style={styles.error}>{message}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 15,
    },
    info: {
        marginBottom: 15,
        fontSize: 14,
        color: 'gray',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'green',
    },
    error: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: 'red',
    },
})

export default CurrencyExchangePage
