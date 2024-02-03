document.addEventListener("DOMContentLoaded", function() {
    let intervalId = setInterval(function() {
        for (let i = 0; i < 3; i++) {
            let circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.left = Math.random() * window.innerWidth + 'px';
            circle.style.top = Math.random() * window.innerHeight + 'px';
            document.body.appendChild(circle);

            // Add event listener to each circle
            circle.addEventListener('mouseover', function() {
                clearInterval(intervalId);
            });
        }
    }, 150);
});
