document.addEventListener("DOMContentLoaded", function() {
    let intervalId = setInterval(function() {
        for (let i = 0; i < 3; i++) {
            let circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.left = Math.random() * window.innerWidth + 'px';
            circle.style.top = Math.random() * window.innerHeight + 'px';
            document.body.appendChild(circle);

            circle.addEventListener('mouseover', function(event) {
                clearInterval(intervalId);

                let redCircle = document.createElement('div');
                redCircle.className = 'red-circle';
                redCircle.style.left = event.clientX + 'px';
                redCircle.style.top = event.clientY + 'px';
                document.body.appendChild(redCircle);
            });
        }
    }, 150);
});
