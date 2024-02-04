// script.js
document.addEventListener("DOMContentLoaded", function() {
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

    gameLoop();
});
