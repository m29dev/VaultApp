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
    const [plnExchange, setPlnExchange] = useState(true)

    const [userCurrencies, setUserCurrencies] = useState([])

    const [currentCurrency, setCurrentCurrency] = useState('PLN')
    const [newCurrency, setNewCurrency] = useState('EUR')
    const [currentAsk, setCurrentAsk] = useState('')
    const [currentBid, setCurrentBid] = useState('')

    const [amount, setAmount] = useState('')
    const [amountReceive, setAmountReceive] = useState('')

    const [result, setResult] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        console.log('new amout: ', amount)
        const currency = newCurrency.slice(0, 3)
        let ask = 0
        let bid = 0
        rates.map((item) => {
            if (item.code === currency) {
                ask = item.ask
                bid = item.bid
                return
            }
        })

        console.log('ASK: ', ask)
        console.log('BID: ', bid)
        setCurrentAsk(ask)
        setCurrentBid(bid)

        if (!amount) return setAmountReceive(0)

        if (plnExchange) {
            const newAmount = (amount / ask).toFixed(2)
            setAmountReceive(newAmount)
        }

        if (!plnExchange) {
            const newAmount = (amount * bid).toFixed(2)
            setAmountReceive(newAmount)
        }
    }, [amount, newCurrency, plnExchange])

    const handleInputChange = (text) => {
        // Allow only numbers (optional additional validation)
        const numericValue = text.replace(/[^0-9]/g, '')
        setAmount(numericValue)
    }

    const handleExchange = async () => {
        try {
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

            if (amount <= 0) return setMessage('Amount must be > 1')
            if (amount >= 1000000)
                return setMessage('Amount must be < 1 000 000')

            if (currentCurrencyInfo?.amount < amount)
                return setMessage('Amount must be <= amount in wallet')

            setMessage('')
            let data

            if (plnExchange) {
                console.log(
                    'On Currency Exchange: ',
                    currentCurrency,
                    newCurrency,
                    amount
                )

                data = await postCurrencyExchange(
                    currentCurrency,
                    newCurrency,
                    amount
                )
            }

            if (!plnExchange) {
                console.log(
                    'On Currency Exchange: ',
                    newCurrency,
                    currentCurrency,
                    amount
                )

                data = await postCurrencyExchange(
                    newCurrency,
                    currentCurrency,
                    amount
                )
            }

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

            const currency = newCurrency.slice(0, 3)
            let ask = 0
            let bid = 0
            data.map((item) => {
                if (item.code === currency) {
                    ask = item.ask
                    bid = item.bid
                    return
                }
            })

            console.log('ASK: ', ask)
            console.log('BID: ', bid)
            setCurrentAsk(ask)
            setCurrentBid(bid)
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
                <Text style={styles.sectionTitle}>Exchange</Text>

                {plnExchange && (
                    <View style={styles.selectCurrencyBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="..."
                            keyboardType="numeric"
                            value={amount}
                            maxLength={7}
                            onChangeText={handleInputChange}
                        />

                        <Picker
                            selectedValue={currentCurrency}
                            onValueChange={(itemValue) =>
                                setCurrentCurrency(itemValue)
                            }
                            style={styles.picker}
                        >
                            <Picker.Item
                                key={1}
                                label={`PLN (zloty)`}
                                value={`PLN`}
                            />
                        </Picker>
                    </View>
                )}
                {!plnExchange && (
                    <View style={styles.selectCurrencyBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="..."
                            keyboardType="numeric"
                            value={amount}
                            maxLength={7}
                            onChangeText={handleInputChange}
                        />

                        <Picker
                            selectedValue={newCurrency}
                            onValueChange={(itemValue) =>
                                setNewCurrency(itemValue)
                            }
                            style={styles.picker}
                        >
                            {rates.map((currency) => (
                                <Picker.Item
                                    key={currency.code}
                                    label={`${currency.code} (${currency.currency})`}
                                    value={currency.code}
                                />
                            ))}
                        </Picker>
                    </View>
                )}

                <View>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                            setPlnExchange(!plnExchange)
                        }}
                    >
                        <Text style={styles.addButtonText}>switch</Text>
                    </TouchableOpacity>
                </View>

                {/* New Currency Selector */}
                <Text style={styles.sectionTitle}>Receive</Text>

                {plnExchange && (
                    <View style={styles.selectCurrencyBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="..."
                            keyboardType="numeric"
                            value={amountReceive}
                            maxLength={7}
                        />

                        <Picker
                            selectedValue={newCurrency}
                            onValueChange={(itemValue) =>
                                setNewCurrency(itemValue)
                            }
                            style={styles.picker}
                        >
                            {rates
                                .filter(
                                    (currency) =>
                                        currency.code !== currentCurrency
                                )
                                .map((currency) => (
                                    <Picker.Item
                                        key={currency.code}
                                        label={`${currency.code} (${currency.currency})`}
                                        value={currency.code}
                                    />
                                ))}
                        </Picker>
                    </View>
                )}
                {!plnExchange && (
                    <View style={styles.selectCurrencyBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="..."
                            keyboardType="numeric"
                            value={amountReceive}
                            maxLength={7}
                        />

                        <Picker
                            selectedValue={currentCurrency}
                            onValueChange={(itemValue) =>
                                setCurrentCurrency(itemValue)
                            }
                            style={styles.picker}
                        >
                            <Picker.Item
                                key={1}
                                label={`PLN (zloty)`}
                                value={`PLN`}
                            />
                        </Picker>
                    </View>
                )}

                {/* buys */}
                {plnExchange && <Text>Current currency: {currentAsk}</Text>}

                {/* sells */}
                {!plnExchange && <Text>Current currency: {currentBid}</Text>}

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleExchange}
                >
                    <Text style={styles.addButtonText}>exchange</Text>
                </TouchableOpacity>

                {/* Result Message */}
                {result ? <Text style={styles.result}>{result}</Text> : null}
                {message ? <Text style={styles.error}>{message}</Text> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selectCurrencyBox: {
        display: 'flex',
        flexDirection: 'row',
    },
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
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
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
