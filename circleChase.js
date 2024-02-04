let redCircleMade = false;
let score = 0;

document.addEventListener("DOMContentLoaded", function() {
    let scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    document.body.appendChild(scoreDisplay);

    function updateScore() {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
    }

    // Start the score update interval (every second)
    let scoreIntervalId = setInterval(updateScore, 1000);
    gameOverCondition = false;

    var gameContainer = document.getElementById('game-container');
    var circle = document.createElement('div');
    circle.classList.add('circle');
    gameContainer.appendChild(circle);

    var mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function gameLoop() {
        moveCircle();
        requestAnimationFrame(gameLoop);
    }

    function moveCircle() {
        var circleX = circle.offsetLeft + circle.offsetWidth / 2;
        var circleY = circle.offsetTop + circle.offsetHeight / 2;
        var deltaX = mouseX - circleX;
        var deltaY = mouseY - circleY;

        circle.style.left = (circle.offsetLeft + deltaX * 0.05) + 'px';
        circle.style.top = (circle.offsetTop + deltaY * 0.05) + 'px';
    }

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


    gameLoop();

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
