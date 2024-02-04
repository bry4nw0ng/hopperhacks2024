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
                    }, 1000);
                    //Restart button
                    let restartButton = document.getElementById('restartButton');
                    if (!restartButton) {
                        // If it doesn't exist, create it
                        restartButton = document.createElement('button');
                        restartButton.id = 'restartButton';
                        restartButton.innerHTML = '<img src="resources/restart.png" alt="Restart Game">';
                        // Add click event listener for restarting the game
                        restartButton.addEventListener('click', function() {
                            location.reload();
                        });

                        // Append the button to the body or a specific div
                        document.body.appendChild(restartButton);
                    }
                    let mainButton = document.getElementById('backToMainButton');
                    if (!mainButton) {
                        createBackToMainButton();
                    }
                }
            });
        }
    }, 150);

    // Create Game Over element
let gameOverElement = document.createElement('div');
gameOverElement.textContent = 'GAME OVER';
gameOverElement.style.fontSize = '3.5em'; // Make it big
gameOverElement.id = 'gameOver'; // Assign an ID for CSS targeting
document.body.appendChild(gameOverElement);

function createBackToMainButton() {
    let backToMainButton = document.createElement('button');
    backToMainButton.id = 'backToMainButton';
    backToMainButton.style.opacity1 = 1;
    backToMainButton.textContent = 'Back to Main Page';
    backToMainButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Replace with your main page URL
    });
    
    document.body.appendChild(backToMainButton);
}


});
