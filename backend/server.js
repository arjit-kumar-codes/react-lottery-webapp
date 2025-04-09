require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');
const { Client } = require('whatsapp-web.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lottery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Initialize WhatsApp Client
const client = new Client();

client.on('qr', qr => {
  console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
  console.log('WhatsApp Client is ready!');
});

client.initialize();

// Models
const Ticket = mongoose.model('Ticket', {
  number: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now },
  paymentId: { type: String, required: true },
  status: { type: String, enum: ['active', 'used', 'expired'], default: 'active' }
});

const WinningNumber = mongoose.model('WinningNumber', {
  numbers: [{ type: String }],
  drawDate: { type: Date, default: Date.now }
});

// API Routes
app.post('/api/create-order', async (req, res) => {
  try {
    const options = {
      amount: 10000, // Amount in paise (₹100)
      currency: 'INR',
      receipt: 'receipt_' + Date.now()
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.post('/api/tickets', async (req, res) => {
  try {
    const { userId, paymentId } = req.body;
    
    // Generate unique ticket number
    const number = Math.floor(Math.random() * 100) + 1;
    const formattedNumber = number.toString().padStart(3, '0');

    const ticket = new Ticket({
      number: formattedNumber,
      userId,
      paymentId
    });

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

app.post('/api/winning-numbers', async (req, res) => {
  try {
    const numbers = [];
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * 100) + 1;
      const formattedNum = num.toString().padStart(3, '0');
      if (!numbers.includes(formattedNum)) {
        numbers.push(formattedNum);
      }
    }

    const winningNumber = new WinningNumber({ numbers });
    await winningNumber.save();

    // Send WhatsApp message with winning numbers
    const message = `🎉 This week's winning numbers:\n${numbers.join(', ')}\n\nCongratulations to the winners! 🎊`;
    const targetGroup = process.env.WHATSAPP_GROUP_ID;
    if (targetGroup) {
      await client.sendMessage(targetGroup, message);
    }

    res.json(winningNumber);
  } catch (error) {
    console.error('Error generating winning numbers:', error);
    res.status(500).json({ error: 'Failed to generate winning numbers' });
  }
});

app.get('/api/tickets/:userId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.params.userId });
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});