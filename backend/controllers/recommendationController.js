import axios from 'axios'

export const generateOutfit = async (req, res) => {
  try {
    // Forward request to Python ML service
    const response = await axios.post(
      'http://localhost:8000/generate',
      req.body
    )

    res.status(200).json(response.data)

  } catch (error) {
    console.error('ML Service error:', error.message)
    res.status(500).json({
      message: 'Failed to generate outfit',
      error: error.message
    })
  }
}