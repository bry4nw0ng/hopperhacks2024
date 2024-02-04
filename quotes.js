function fetchRandomQuote() {

    // Define the API endpoint
    const apiUrl = "https://api.quotable.io/random";
    const quoteTextElement = document.getElementById("quote-text");

    // Make a GET request to the API
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        // 'data' contains the response from the API
        console.log(data);
        // You can access the quote and other details like this:
        const quote = data.content;
        const author = data.author;
        quoteTextElement.textContent = `"${quote}" - ${author}`;

        // console.log(`Quote: "${quote}" - Author: ${author}`);
    })
    .catch((error) => {
        console.error("Error fetching quote:", error);
    });
    }

document.addEventListener("DOMContentLoaded", fetchRandomQuote);

