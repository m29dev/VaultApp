import { getSession, saveSession } from './storageConfig'

const API_BASE_URL = 'http://localhost:3000' // Replace with your API's base URL

export const postSignIn = async (login, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('API request failed:', error)
        throw error
    }
}

export const postSignUp = async (login, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('API request failed:', error)
        throw error
    }
}

export const getCurrency = async () => {
    const response = await fetch(`${API_BASE_URL}/api/currency/get`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
}

export const postCurrencyExchange = async (
    currentCurrency,
    newCurrency,
    amount
) => {
    try {
        const user = await getSession()

        const response = await fetch(`${API_BASE_URL}/api/currency/exchange`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentCurrency,
                newCurrency,
                amount,
                userId: user ? user?._id : null,
            }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('API request failed:', error)
        throw error
    }
}

export const getTransactions = async () => {
    const user = await getSession()

    const response = await fetch(`${API_BASE_URL}/api/transactions/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: user ? user?._id : null,
        }),
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
}

export const getWallet = async () => {
    const user = await getSession()

    const response = await fetch(`${API_BASE_URL}/api/wallet/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: user ? user?._id : null,
        }),
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
}

export const postAddMoney = async (amount) => {
    try {
        const user = await getSession()

        const response = await fetch(`${API_BASE_URL}/api/transactions/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                userId: user ? user?._id : null,
            }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('API request failed:', error)
        throw error
    }
}
