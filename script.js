document.addEventListener('DOMContentLoaded', () => {
    const sharesCountElement = document.getElementById('shares-count');
    const tasksSection = document.getElementById('tasks-section');
    let userShares = 0; // Start with 0 shares

    // Update share count on page load
    function updateSharesDisplay() {
        sharesCountElement.textContent = `Your Shares: ${userShares}`;
    }

    // Subscribe button click event
    document.getElementById('subscribe-btn').addEventListener('click', () => {
        fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegramId: 'user-telegram-id' }) // Example ID; replace with actual
        })
        .then(response => response.json())
        .then(data => {
            userShares += 1000; // Add shares for subscribing
            updateSharesDisplay();
            alert(data.message);
        })
        .catch(error => console.error('Error:', error));
    });

    // Video completion button
    document.getElementById('video-complete-btn').addEventListener('click', () => {
        // Hide the video and the task
        document.getElementById('youtube-video').style.display = 'none';
        document.getElementById('watch-video-task').style.display = 'none';
        userShares += 500; // Add shares for watching video
        updateSharesDisplay();
        alert('Video watched! You have earned 500 shares.');
    });

    // Validate that the user has joined the Telegram channel
    document.querySelector('#join-telegram-task a').addEventListener('click', () => {
        // Simulate validation; this would normally involve an API call or tracking
        setTimeout(() => {
            userShares += 500; // Add shares for joining Telegram
            document.getElementById('join-telegram-task').style.display = 'none'; // Hide task
            updateSharesDisplay();
            alert('Telegram channel joined! You have earned 500 shares.');
        }, 2000); // Simulate delay for validation
    });

    // Referral task - always visible
    document.querySelector('#referral-task a').addEventListener('click', () => {
        userShares += 500; // Add shares for referring friends
        alert('Referral link clicked! You have earned 500 shares.');
        updateSharesDisplay();
    });

    // Withdraw form submission
    document.getElementById('withdraw-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const walletAddress = document.getElementById('ton-wallet').value;

        if (userShares <= 0) {
            alert('No shares available for withdrawal.');
            return;
        }

        fetch('/api/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegramId: 'user-telegram-id', amount: userShares }) // Example values; replace with actual
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userShares = 0; // Deduct all shares on successful withdrawal
                updateSharesDisplay();
                alert('Withdrawal successful.');
            } else {
                alert('Withdrawal failed.');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    updateSharesDisplay(); // Initial update
});
