import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Picker,
    TouchableOpacity,
} from 'react-native'
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

    const handleInputChange = (text) => {
        // Allow only numbers (optional additional validation)
        const numericValue = text.replace(/[^0-9]/g, '')
        setAmount(numericValue)
    }

    const handleExchange = async () => {
        try {
            setMessage('')

            console.log(
                'On Currency Exchange: ',
                currentCurrency,
                newCurrency,
                amount
            )

            let currentCurrencyInfo = {}
            const wallet = userCurrencies
            wallet.map((item) => {
                if (item?.code === currentCurrency) {
                    console.log(
                        'CURRENT CURRENCY IS: ',
                        item?.code,
                        item?.amount
                    )
                    currentCurrencyInfo = item
                }
            })

            if (amount <= 0) return setMessage('Amount must be at least 1 PLN')
            if (amount > 1000000)
                return setMessage('Amount must be at most 999 999 PLN')

            if (currentCurrencyInfo?.amount < amount)
                return setMessage(
                    'Amount must not be larger than amount in wallet'
                )

            const data = await postCurrencyExchange(
                currentCurrency,
                newCurrency,
                amount
            )

            console.log(31, data)

            setResult(`You received: ${data.amount} ${data.code}`)

            const userWallet = await getWallet()
            setUserCurrencies(userWallet)
            console.log('Updated Wallet: ', userWallet)
            setAmount('')
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
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Currency Exchange</Text>
            </View>

            {/* Current Currency Selector */}
            <View style={styles.addMoneySection}>
                <Text style={styles.sectionTitle}>Select Current Currency</Text>

                <Picker
                    selectedValue={currentCurrency}
                    onValueChange={(itemValue) => setCurrentCurrency(itemValue)}
                    style={styles.picker}
                >
                    {userCurrencies.map((currency) => (
                        <Picker.Item
                            key={currency.code}
                            label={`${currency.currency} ${currency.code} (${currency.amount})`}
                            value={currency.code}
                        />
                    ))}
                </Picker>

                {/* New Currency Selector */}
                <Text style={styles.sectionTitle}>Select New Currency</Text>

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
                <Text style={styles.sectionTitle}>Amount to exchange</Text>

                <TextInput
                    style={styles.input}
                    placeholder="between 1 and 999999"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={handleInputChange}
                />

                {/* Exchange Button */}
                {/* <Button title="Exchange" onPress={handleExchange} /> */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleExchange}
                >
                    <Text style={styles.addButtonText}>Exchange</Text>
                </TouchableOpacity>

                {/* Result Message */}
                {result ? <Text style={styles.result}>{result}</Text> : null}
                {message ? <Text style={styles.error}>{message}</Text> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: '#2ecc71',
        borderRadius: 8,
        padding: 10,
        margin: 'auto',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    addMoneyInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
    },
    addMoneySection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
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
        marginBottom: 30,
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
