import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
})

export const getSubscriberNamesAndChannels = async () => {
  try {
    const response = await api.get('/subscribers/names')
    return response.data
  } catch (error) {
    console.error('Error fetching subscriber names and channels:', error)
    throw error
  }
}

export const getSubscribers = async () => {
  try {
    const response = await api.get('/subscribers')
    return response.data
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    throw error
  }
}

export const getSubscriberById = async (id) => {
  try {
    const response = await api.get(`/subscribers/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching subscriber with id ${id}:`, error)
    throw error
  }
}
