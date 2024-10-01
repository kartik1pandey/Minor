// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Replace with your MongoDB URI
const uri = "mongodb+srv://kartik3pandey:yzi1AF8MnD6wry4k@cluster0.rjth4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI


// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define a schema for the data you want to store
const customizationSchema = new mongoose.Schema({
  section: String,
  content: String,
  bgColor: String,
  textColor: String,
  date: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Customization = mongoose.model('Customization', customizationSchema);

// Route to handle incoming customization data
app.post('/save-changes', async (req, res) => {
  try {
    const { section, content, bgColor, textColor } = req.body;

    // Create a new customization document
    const customization = new Customization({
      section,
      content,
      bgColor,
      textColor,
    });

    // Save the document to MongoDB
    await customization.save();

    res.status(200).send('Data saved successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
