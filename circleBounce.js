let width = 40; 
let margin = 20; 
let delta = width + margin;
let score = 0;

document.addEventListener("DOMContentLoaded", function() {

    // Set the interval ID
    let intervalID; // This will be used to stop the interval later
    let i = 0; // This will be used to create unique IDs for the circles
    const oneSecond = 1000; // 1000ms = 1 second

    // Correctly assign the ID returned by setInterval to intervalID
    intervalID = setInterval(() => {
        createAndInitializeDivObject(`circle${i}`); // Create a new circle
        i += 1;                                     // Increment the ID every second
    }, oneSecond); 

    let top = document.getElementById('main'); // main cointainer for balls
    let scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.textContent = 'Score: ' + score; // Initialize score text
    top.appendChild(scoreDisplay);

    // Function to update the score
    function updateScore() {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
    }

    // Start the score update interval (every second)
    let scoreIntervalId = setInterval(updateScore, 1000);

    // End game function
    function endGame() {
        // Stop creating new balls
        clearInterval(intervalID);
        clearInterval(scoreIntervalId)

        // Hide or remove existing balls
        let balls = document.querySelectorAll('.circle');
        balls.forEach(ball => {
            ball.remove(); 
        });
        // Display game over message
        let gameOverElement = document.createElement('div');
        gameOverElement.textContent = 'GAME OVER';
        gameOverElement.style.fontSize = '2em'; // Make it big
        gameOverElement.id = 'gameOver'; // Assign an ID for CSS targeting
        document.body.appendChild(gameOverElement);
        document.getElementById('gameOver').style.display = 'block';
        // Show Game Over after 2 seconds
        setTimeout(() => {
            gameOverElement.style.opacity = 1; // Make it visible
            gameOverElement.classList.add('flash-red'); // Add class to trigger animation
        }, 250);
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
            top.appendChild(restartButton);
        }
        //main button
        let mainButton = document.getElementById('backToMainButton');
        if (!mainButton) {
            createBackToMainButton();
        }
    }

    function createBackToMainButton() {
        let backToMainButton = document.createElement('button');
        backToMainButton.id = 'backToMainButton';
        backToMainButton.style.opacity1 = 1;
        backToMainButton.textContent = 'Back to Main Page';
        backToMainButton.addEventListener('click', function() {
            window.location.href = 'index.html'; // main page URL
        });
        
        document.body.appendChild(backToMainButton);
    }

    let mainContainer = document.getElementById('main'); // main cointainer for balls
    function createAndInitializeDivObject(id, color) {
        let div = document.createElement('div');
        let containerHeight = mainContainer.clientHeight;
        let containerWidth = mainContainer.clientWidth;
        // Add mouseover event listener
        div.addEventListener('mouseover', function() {
            console.log('Circle touched'); // Debugging line
            endGame();
        });
        div.setAttribute('class', id);
        if (color === undefined) {
            let colors = ['#35def2', '#35f242', '#b2f235', '#f2ad35', '#f24735', '#3554f2', '#8535f2', '#eb35f2', '#f2359b', '#f23547'];
            div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        } else {
            div.style.backgroundColor = color; 
        }
        div.classList.add("circle");
        div.classList.add("animation");

        // Get the random positions minus the delta
        currentTop = Math.floor(Math.random() * containerHeight) - delta;
        currentLeft = Math.floor(Math.random() * containerWidth) - delta;

        // Keep the positions within the container boundaries
        let limitedTop = Math.max(margin * -1, Math.min(currentTop, containerHeight - width));
        let limitedLeft = Math.max(margin * -1, Math.min(currentLeft, containerWidth - width));

        div.style.top = limitedTop + "px";
        div.style.left = limitedLeft + "px";
        //Append to document
        mainContainer.appendChild(div);
        //Intialize movement
        let x = new RandomObjectMover(document.querySelector(`.${id}`), window);
        x.start();
    }

    //move circles

    function RandomObjectMover(obj, container) {
        this.$object = obj;
        this.$container = container;
        this.container_is_window = container === window;
        this.pixels_per_second = Math.random() * 10 + 250;
        this.current_position = { x: 0, y: 0 };
        this.is_running = false;
    }

    // Set the speed of movement in Pixels per Second.
    RandomObjectMover.prototype.setSpeed = function(pxPerSec) {
        this.pixels_per_second = pxPerSec;
    }

    RandomObjectMover.prototype._getContainerDimensions = function() {
        if (this.$container === window) {
            return { 'height' : this.$container.innerHeight, 'width' : this.$container.innerWidth };
        } else {
            return { 'height' : this.$container.clientHeight, 'width' : this.$container.clientWidth };
        }
    }

    RandomObjectMover.prototype._generateNewPosition = function() {
        // Get container dimensions minus div size
        let containerSize = this._getContainerDimensions();
        let availableHeight = containerSize.height - this.$object.clientHeight;
        let availableWidth = containerSize.width - this.$object.clientHeight;
        
        // Pick a random place in the space
        let y = Math.floor(Math.random() * availableHeight);
        let x = Math.floor(Math.random() * availableWidth);
            
        return { x: x, y: y };    
    }

    RandomObjectMover.prototype._calcDelta = function(a, b) {
        let dx = a.x - b.x;         
        let dy = a.y - b.y;         
        let dist = Math.sqrt(dx*dx + dy*dy); 
        return dist;
    }

    RandomObjectMover.prototype._moveOnce = function() {
        // Pick a new spot on the page
        let next = this._generateNewPosition();
        
        // How far do we have to move?
        let delta = this._calcDelta(this.current_position, next);
        
        // Speed of this transition, rounded to 2DP
        let speed = Math.round((delta / this.pixels_per_second) * 100) / 100;
        
        //console.log(this.current_position, next, delta, speed);
        
        this.$object.style.transition='transform '+speed+'s linear';
        this.$object.style.transform='translate3d('+next.x+'px, '+next.y+'px, 0)';
        
        // Save this new position ready for the next call.
        this.current_position = next;

    };

    RandomObjectMover.prototype.start = function() {

        if (this.is_running) {
            return;
        }

        // Make sure our object has the right css set
        this.$object.willChange = 'transform';
        this.$object.pointerEvents = 'auto';
        
        this.boundEvent = this._moveOnce.bind(this)
        
        // Bind callback to keep things moving
        this.$object.addEventListener('transitionend', this.boundEvent);
        
        // Start it moving
        this._moveOnce();
        
        this.is_running = true;
    }

    RandomObjectMover.prototype.stop = function() {

        if (!this.is_running) {
            return;
        }

        this.$object.removeEventListener('transitionend', this.boundEvent);

        this.is_running = false;
    }

    let x = new RandomObjectMover(document.querySelector(".circle"), window);

    x.start();
});