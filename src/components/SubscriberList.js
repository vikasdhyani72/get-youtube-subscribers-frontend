import React, { useState } from 'react'
import {
  Button,
  TextField,
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { GitHub, LinkedIn, Mail } from '@mui/icons-material'

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([])
  const [subscriberNames, setSubscriberNames] = useState([])
  const [subscriberById, setSubscriberById] = useState(null)
  const [subscriberId, setSubscriberId] = useState('')
  const [showAllSubscribers, setShowAllSubscribers] = useState(false)
  const [showSubscriberNames, setShowSubscriberNames] = useState(false)
  const [apiRoute, setApiRoute] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  // Fetch all subscribers
  const fetchSubscribers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/subscribers')
      const data = await response.json()
      setSubscribers(data)
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    }
  }

  // Fetch subscriber names only
  const fetchSubscriberNames = async () => {
    try {
      const namesResponse = await fetch(
        'http://localhost:4000/api/subscribers/names'
      )
      const namesData = await namesResponse.json()
      setSubscriberNames(namesData)
    } catch (error) {
      console.error('Error fetching subscriber names:', error)
    }
  }

  // Fetch subscriber by ID
  const fetchSubscriberById = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/subscribers/${subscriberId}`
      )
      const data = await response.json()
      if (data._id) {
        setSubscriberById(data)
      } else {
        alert('Subscriber not found!')
      }
    } catch (error) {
      console.error('Error fetching subscriber by ID:', error)
    }
  }

  const handleAllSubscribers = () => {
    setShowAllSubscribers(true)
    setShowSubscriberNames(false)
    fetchSubscribers() // Fetch all subscribers
    setApiRoute('http://localhost:4000/api/subscribers') // Set API route for all subscribers
  }

  const handleSubscriberByName = () => {
    setShowAllSubscribers(false)
    setShowSubscriberNames(true)
    fetchSubscriberNames() // Fetch only names
    setApiRoute('http://localhost:4000/api/subscribers/names') // Set API route for subscriber names
  }

  const handleSubscriberByIdSubmit = (e) => {
    e.preventDefault()
    fetchSubscriberById() // Fetch subscriber by ID
    setApiRoute(`http://localhost:4000/api/subscribers/${subscriberId}`) // Set API route for subscriber by ID
  }

  // Clipboard copy function
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(apiRoute).then(() => {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false) // Hide popup after 3 seconds
      }, 3000)
    })
  }

  // Open Swagger UI in a new tab
  const handleApiDocRedirect = () => {
    window.open('http://localhost:4000/api-docs', '_blank') // Open in new tab
  }

  // Reload function when "Get YouTube Subscriber" is clicked
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <Box
      sx={{
        backgroundColor: '#f4f4f4', // Background color for the entire page
        minHeight: '100vh', // Ensure the page fills the entire screen
        padding: '20px', // General padding for the entire page
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          padding: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginTop: 3,
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
          }}
        >
          {/* "Get YouTube Subscriber" Title */}
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              cursor: 'pointer',
              color: 'black',
              fontWeight: 'bold',
            }}
            onClick={handleReload}
          >
            Get <span style={{ color: 'red' }}>YouTube</span> Subscriber
          </Typography>

          {/* Buttons */}
          <Box display="flex" justifyContent="center" gap={2} mb={3}>
            <Button variant="contained" onClick={handleAllSubscribers}>
              All Subscribers
            </Button>
            <Button variant="contained" onClick={handleSubscriberByName}>
              Subscriber by Name
            </Button>
          </Box>

          {/* Input Field for Subscriber ID */}
          <Box
            component="form"
            onSubmit={handleSubscriberByIdSubmit}
            mb={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <TextField
              label="Enter Subscriber ID"
              variant="outlined"
              value={subscriberId}
              onChange={(e) => setSubscriberId(e.target.value)}
              fullWidth
            />
            <Button variant="contained" type="submit">
              Get Subscriber
            </Button>
          </Box>

          {/* Display subscriber by ID */}
          {subscriberById && (
            <Box mb={3}>
              <Typography variant="h6">Subscriber Details:</Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`Name: ${subscriberById.name}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`ID: ${subscriberById._id}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Channel: ${subscriberById.subscribedChannel}`}
                  />
                </ListItem>
              </List>
            </Box>
          )}

          {/* Display All Subscribers */}
          {showAllSubscribers && (
            <Box>
              <Typography variant="h5">All Subscribers</Typography>
              <List>
                {subscribers.map((subscriber) => (
                  <ListItem key={subscriber._id}>
                    <ListItemText
                      primary={`Name: ${subscriber.name}`}
                      secondary={`ID: ${subscriber._id}, Channel: ${subscriber.subscribedChannel}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Display Subscriber Names */}
          {showSubscriberNames && (
            <Box>
              <Typography variant="h5">Subscriber Names</Typography>
              <List>
                {subscriberNames.map((name, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Display the API Route */}
          {apiRoute && (
            <Box mt={3}>
              <Typography variant="h6">API Route:</Typography>
              <Typography>{apiRoute}</Typography>
            </Box>
          )}
          {/* Copy URL Button */}
          {apiRoute && (
            <Box display="flex" justifyContent="center" mb={3}>
              <Button
                variant="outlined"
                onClick={handleCopyToClipboard}
                sx={{ width: 'auto' }}
              >
                Copy API URL
              </Button>
            </Box>
          )}

          {/* Share Buttons */}
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button
              variant="contained"
              startIcon={<LinkedIn />}
              href="https://www.linkedin.com"
              target="_blank"
              sx={{
                backgroundColor: '#0077b5',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#005582',
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<GitHub />}
              href="https://github.com"
              target="_blank"
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#444',
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<Mail />}
              href="mailto:?subject=Check%20this%20out&body=I%20found%20this%20cool%20link!"
              target="_blank"
              sx={{
                backgroundColor: '#D44638',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#b02e28',
                },
              }}
            />
          </Box>

          {/* API Documentation Button */}
          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="outlined" onClick={handleApiDocRedirect}>
              API Documentation
            </Button>
          </Box>

          {/* Popup for Copy Success */}
          {showPopup && (
            <Box
              sx={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                zIndex: 1000,
              }}
            >
              <Typography variant="body2">
                API URL copied to clipboard!
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default SubscriberList
