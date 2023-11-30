const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Load initial data
const challengesData = JSON.parse(fs.readFileSync('challenges.json', 'utf8'));
let usersData = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// API endpoint to get challenges
app.get('/api/challenges', (req, res) => {
  res.json(challengesData);
});

// API endpoint to get user data
app.get('/api/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = usersData.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// API endpoint to submit challenge completion
app.post('/api/challenges/:userId/:challengeId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const challengeId = parseInt(req.params.challengeId);

  const user = usersData.find((u) => u.id === userId);
  const challenge = challengesData.challenges.find((c) => c.id === challengeId);

  if (user && challenge) {
    // Check if the challenge is not already completed by the user
    if (!user.completedChallenges.includes(challengeId)) {
      user.totalRewards += challenge.reward;
      user.completedChallenges.push(challengeId);

      // Update user data file
      fs.writeFileSync('users.json', JSON.stringify(usersData, null, 2));

      res.json({ success: true, message: 'Challenge completed successfully!' });
    } else {
      res.status(400).json({ error: 'Challenge already completed by the user' });
    }
  } else {
    res.status(404).json({ error: 'User or challenge not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
