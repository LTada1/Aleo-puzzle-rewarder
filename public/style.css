document.addEventListener('DOMContentLoaded', () => {
  fetchChallenges();
  fetchUserInfo(1); // Assuming user ID 1 for demonstration purposes
});

function fetchChallenges() {
  fetch('/api/challenges')
    .then((response) => response.json())
    .then((challenges) => {
      const challengesContainer = document.getElementById('challenges-container');

      challenges.challenges.forEach((challenge) => {
        const challengeDiv = document.createElement('div');
        challengeDiv.classList.add('challenge');
        challengeDiv.innerHTML = `
          <h3>Challenge ${challenge.id}</h3>
          <p>${challenge.description}</p>
          <button onclick="completeChallenge(${challenge.id})">Complete Challenge</button>
        `;
        challengesContainer.appendChild(challengeDiv);
      });
    });
}

function fetchUserInfo(userId) {
  fetch(`/api/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      const userInfoContainer = document.getElementById('user-info');
      userInfoContainer.innerHTML = `
        <h2>User Information</h2>
        <p>Username: ${user.username}</p>
        <p>Wallet Address: ${user.walletAddress}</p>
        <p>Total Rewards: ${user.totalRewards}</p>
      `;
    });
}

function completeChallenge(challengeId) {
  const userId = 1; // Assuming user ID 1 for demonstration purposes

  fetch(`/api/challenges/${userId}/${challengeId}`, {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      fetchUserInfo(userId);
    })
    .catch((error) => {
      alert('Error completing the challenge. Please try again.');
      console.error(error);
    });
}
