const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = process.env.PORT || 5014;

app.use(cors());
app.use(express.json());

// ✅  Google OAuth client ID
const CLIENT_ID = '902519970329-lrr56abglk2pltrq0obg4g18n5cmv3vd.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// ✅ Route to verify Google token sent from frontend
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // DB logic here (check if user exists or create user)
    console.log('User Info:', { email, name, picture });

    res.status(200).json({
      email,
      name,
      picture,
      message: 'Google login successful',
    });

  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
