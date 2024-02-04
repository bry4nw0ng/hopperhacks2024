let redCircleMade = false;
let score = 0;

document.addEventListener("DOMContentLoaded", function() {
    let scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    document.body.appendChild(scoreDisplay);
    
    // Function to update the score
    function updateScore() {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
    }

    // Start the score update interval (every second)
    let scoreIntervalId = setInterval(updateScore, 1000);
    gameOverCondition = false;

    let intervalId = setInterval(function() {
        for (let i = 0; i < 3; i++) {
            let circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.left = Math.random() * window.innerWidth + 'px';
            circle.style.top = Math.random() * window.innerHeight + 'px';
            document.body.appendChild(circle);

            circle.addEventListener('mouseover', function(event) {
                if (!redCircleMade) {
                    clearInterval(intervalId);
                    clearInterval(scoreIntervalId); // Stop the score update
                        
                    let redCircle = document.createElement('div');
                    redCircle.className = 'red-circle';
                    redCircle.style.left = event.clientX + 'px';
                    redCircle.style.top = event.clientY + 'px';
                    document.body.appendChild(redCircle);
                    redCircleMade = true;
                    gameOverCondition = true;
                    ;
                }
                if (gameOverCondition) {
                    clearInterval(scoreIntervalId); // Stop the score update
                    document.getElementById('gameOver').style.display = 'block';
                    // Show Game Over after 2 seconds
                    setTimeout(() => {
                        gameOverElement.style.opacity = 1; // Make it visible
                        gameOverElement.classList.add('flash-red'); // Add class to trigger animation
                    }, 2000);
                }
            });
        }
    }, 150);

// Create Game Over element
let gameOverElement = document.createElement('div');
gameOverElement.textContent = 'GAME OVER';
gameOverElement.style.display = 'none'; // Hide initially
gameOverElement.style.fontSize = '3.5em'; // Make it big
gameOverElement.id = 'gameOver'; // Assign an ID for CSS targeting
document.body.appendChild(gameOverElement);

});
