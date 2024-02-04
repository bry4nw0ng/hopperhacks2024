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
                }
            });
        }
    }, 150);

    

});
