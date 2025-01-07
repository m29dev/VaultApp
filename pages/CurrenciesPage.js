import React, { useEffect, useState } from 'react'
import { getCurrency, getCurrencyDate } from '../config/vaultServerApi'
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native'
import { Picker, TouchableOpacity } from 'react-native-web'

const CurrenciesPage = () => {
    const [currencies, setCurrencies] = useState([])
    const [day, setDay] = useState(1)
    const [month, setMonth] = useState(1)
    const [year, setYear] = useState(2011)
    const [message, setMessage] = useState('')
    const [dateInfo, setDateInfo] = useState('')

    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const months = Array.from({ length: 12 }, (_, i) => i + 1)
    const years = Array.from({ length: 2024 - 2011 + 1 }, (_, i) => 2011 + i)

    useEffect(() => {
        console.log('on init fetch currencies')
        const currentDate = new Date()
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        setDay(day)
        setMonth(month)
        setYear(year)

        setDateInfo(`${day}.${month}.${year}`)

        const info = async () => {
            const res = await getCurrency()
            if (!res) return console.log('err')
            const currenciesInfo = res?.[0]?.rates
            console.log(currenciesInfo)
            setCurrencies(currenciesInfo)
        }
        info()
    }, [])

    const handleSearchByDate = async () => {
        try {
            setMessage('')
            const queryData = `${year}-${month < 10 ? '0' + month : month}-${
                day < 10 ? '0' + day : day
            }`
            console.log(queryData)

            const res = await getCurrencyDate(queryData)
            const curenciesNew = res?.[0]?.rates
            setCurrencies(curenciesNew)
            setDateInfo(`${day}.${month}.${year}`)
        } catch (err) {
            console.log(err)
            setMessage('No data for selected date')
        }
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Currencies</Text>
            </View>
            <Text style={styles.title}>Choose currencies date:</Text>

            {/* Wybór dnia */}
            <View style={styles.pickerContainer}>
                <Text>Day:</Text>
                <Picker
                    selectedValue={day}
                    style={styles.picker}
                    onValueChange={(itemValue) => setDay(itemValue)}
                >
                    {days.map((d) => (
                        <Picker.Item key={d} label={d.toString()} value={d} />
                    ))}
                </Picker>
            </View>

            {/* Wybór miesiąca */}
            <View style={styles.pickerContainer}>
                <Text>Month:</Text>
                <Picker
                    selectedValue={month}
                    style={styles.picker}
                    onValueChange={(itemValue) => setMonth(itemValue)}
                >
                    {months.map((m) => (
                        <Picker.Item key={m} label={m.toString()} value={m} />
                    ))}
                </Picker>
            </View>

            {/* Wybór roku */}
            <View style={styles.pickerContainer}>
                <Text>Year:</Text>
                <Picker
                    selectedValue={year}
                    style={styles.picker}
                    onValueChange={(itemValue) => setYear(itemValue)}
                >
                    {years.map((y) => (
                        <Picker.Item key={y} label={y.toString()} value={y} />
                    ))}
                </Picker>
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={handleSearchByDate}
            >
                <Text style={styles.addButtonText}>Search</Text>
            </TouchableOpacity>

            <Text>{message}</Text>

            <View style={styles.currenciesSection}>
                <Text style={styles.sectionTitle}>
                    Currencies from {dateInfo}
                </Text>
                {currencies.length > 0 ? (
                    <ScrollView style={styles.scrollView}>
                        {currencies.map((item, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={styles.historyItem}>
                                    {item?.code} | buy: {item?.ask} | sell:{' '}
                                    {item?.bid}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <Text>No currencies</Text> // Message when array is empty
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
        overflow: 'hidden', // Ensure content respects boundaries
        maxHeight: 'calc(100vh - 64px)',
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
        margin: 'auto',
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
        // maxHeight:
        //     'calc((100vh - 64px - 64px - 103px - 16px - 16px - 16px - 16px) / 2)',
        overflow: 'hidden', // Ensure content respects boundaries
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
        flex: 1,

        // maxHeight: 1000, // Limit the height to 300px
        maxHeight:
            'calc((100vh - 64px - 64px - 103px - 16px - 16px - 16px - 16px) / 2)',
        overflow: 'hidden', // Ensure content respects boundaries
    },
    historyList: {
        marginTop: 8,
    },
    historyItem: {
        fontSize: 14,
        paddingVertical: 4,
        color: '#555',
        marginRight: 10,
    },
    historyBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    pickerContainer: {
        marginVertical: 10,
        width: '100%',
    },
    picker: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    selectedDate: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default CurrenciesPage
