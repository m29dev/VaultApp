import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native'
import {
    getTransactions,
    getWallet,
    postAddMoney,
} from '../config/vaultServerApi'

const WalletPage = () => {
    const [wallet, setWallet] = useState([])
    const [transactions, setTransactions] = useState([])
    const [amount, setAmount] = useState(null)

    const handleAddMoney = async () => {
        try {
            console.log('HandleAddMoney: ', amount)
            const item = await postAddMoney(amount)

            console.log('updated wallet: ', item.wallet)

            setWallet(item.wallet)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateAmount = (value) => {
        console.log(value.target.value)
        const value1 = value.target.value
        setAmount(value1)
    }

    useEffect(() => {
        console.log('on init')

        const onInit = async () => {
            const wallet = await getWallet()
            console.log('wallet: ', wallet)
            setWallet(wallet)

            const transactions = await getTransactions()
            console.log('transactions: ', transactions)
            setTransactions(transactions)
        }
        onInit()
    }, [])

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Wallet</Text>
            </View>

            {/* Add Money Section */}
            <View style={styles.addMoneySection}>
                <Text style={styles.sectionTitle}>Add Money (PLN)</Text>
                <View style={styles.addMoneyInputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={handleUpdateAmount}
                    />
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddMoney}
                    >
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* My Currencies */}
            <View style={styles.currenciesSection}>
                <Text style={styles.sectionTitle}>My Currencies</Text>
                {wallet.length > 0 ? (
                    <ScrollView style={styles.scrollView}>
                        {wallet.map((item, index) => (
                            <View key={index} style={styles.item}>
                                <Text>
                                    {item?.code}: {item?.amount}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <Text>No currencies</Text> // Message when array is empty
                )}
            </View>

            {/* Transaction History */}
            <View style={styles.historySection}>
                <Text style={styles.sectionTitle}>Transaction History</Text>
                <ScrollView style={styles.historyList}>
                    <Text style={styles.historyItem}>
                        Added $500 - 12/15/2024
                    </Text>
                    <Text style={styles.historyItem}>
                        Converted $100 to €92.34 - 12/14/2024
                    </Text>
                    <Text style={styles.historyItem}>
                        Sent ¥10,000 - 12/13/2024
                    </Text>
                    {/* Add more transactions dynamically */}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
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
    addMoneySection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
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
    addButton: {
        backgroundColor: '#2ecc71',
        borderRadius: 8,
        padding: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    currenciesSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    currenciesList: {
        marginTop: 8,
    },
    currencyItem: {
        fontSize: 16,
        paddingVertical: 4,
    },
    historySection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
    },
    historyList: {
        marginTop: 8,
    },
    historyItem: {
        fontSize: 14,
        paddingVertical: 4,
        color: '#555',
    },
})

export default WalletPage
