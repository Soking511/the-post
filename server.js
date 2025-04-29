import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

// File path for storing subscribers
const subscribersFilePath = path.join(__dirname, 'subscribers.txt');

// Create the subscribers file if it doesn't exist
if (!fs.existsSync(subscribersFilePath)) {
  fs.writeFileSync(subscribersFilePath, "SUBSCRIBED EMAILS\n=================\n\n", 'utf8');
  console.log('Created subscribers.txt file');
}

// Endpoint to save a new subscriber
app.post('/api/subscribe', (req, res) => {
  try {
    const { email, timestamp, referrer, userAgent } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Read existing subscribers to get the count and check for duplicates
    const fileContent = fs.readFileSync(subscribersFilePath, 'utf8');
    const lines = fileContent.split('\n');
    let subscriberCount = 0;
    let emailExists = false;

    for (const line of lines) {
      if (line.includes('Email:')) {
        subscriberCount++;
        // Check if this email already exists in our file
        if (line.toLowerCase().includes(`email: ${email.toLowerCase()}`)) {
          emailExists = true;
          console.log(`Email already exists: ${email}`);
          return res.status(409).json({
            success: false,
            message: 'This email is already subscribed.'
          });
        }
      }
    }

    // Format the new subscriber entry
    const newEntry = `${subscriberCount + 1}. Email: ${email}\n` +
                    `   Date: ${new Date(timestamp).toLocaleString()}\n` +
                    `   Referrer: ${referrer || 'direct'}\n` +
                    `   User Agent: ${userAgent || 'unknown'}\n\n`;

    // Append to the file
    fs.appendFileSync(subscribersFilePath, newEntry, 'utf8');

    console.log(`Saved new subscriber: ${email}`);

    res.json({ success: true, message: 'Subscription successful' });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Subscribers are saved to ${subscribersFilePath}`);
});