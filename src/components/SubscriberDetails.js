import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSubscriberById } from '../services/api'

const SubscriberDetails = () => {
  const { id } = useParams() // Access the ID from the URL
  const [subscriber, setSubscriber] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        const data = await getSubscriberById(id)
        setSubscriber(data) // Set the fetched data
      } catch (error) {
        setError('Failed to fetch subscriber details')
        console.error('Error fetching subscriber:', error) // Log the error if it occurs
      }
    }

    fetchSubscriber()
  }, [id])

  if (error) {
    return <div>{error}</div> // Show error message if there's an issue fetching data
  }

  return (
    <div>
      {subscriber ? (
        <>
          <h2>{subscriber.name}</h2>
          <p>Subscribed Channel: {subscriber.subscribedChannel}</p>
        </>
      ) : (
        <p>Loading...</p> // Show loading state while data is being fetched
      )}
    </div>
  )
}

export default SubscriberDetails
