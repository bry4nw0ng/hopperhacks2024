let width = 40; 
let margin = 20; 
let delta = width + margin;

function createAndInitializeDivObject(id, color) {
    let div = document.createElement('div');
    let currentTop = 0;
    let documentHeight = document.documentElement.clientHeight;
    let documentWidth = document.documentElement.clientWidth;
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
    currentTop = Math.floor(Math.random() * documentHeight) - delta;
    currentLeft = Math.floor(Math.random() * documentWidth) - delta;

    // Keep the positions between -20px and the current positions
    let limitedTop = Math.max(margin * -1, currentTop);
    let limitedLeft = Math.max(margin * -1, currentLeft);

    div.style.top = limitedTop + "px";
    div.style.left = limitedLeft + "px";
    document.body.appendChild(div);

    let x = new RandomObjectMover(document.querySelector(`.${id}`), window);
    x.start();
}
    
let i = 0;

const oneSecond = 1000;

setInterval(() => {
    i += 1;
    createAndInitializeDivObject(`circle${i}`)
}, oneSecond);

//move circles

function RandomObjectMover(obj, container) {
    this.$object = obj;
    this.$container = container;
    this.container_is_window = container === window;
    this.pixels_per_second = 250;
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

// Start it off

x.start();
