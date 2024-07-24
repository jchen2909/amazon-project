// Create a XMLHttpRequest object so we can send messages to the backend
const xhr = new XMLHttpRequest();

// Set up the event listener to look for the response
xhr.addEventListener('load', ()=>{
  console.log(xhr.response);
});

// to set up the request, call .open()
// .open() takes in 2 parameters: type, where to send the HTTP  message
// Types of requests:
//    GET
//    POST
//    PUT
//    DELETE
xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');

//Send the message
xhr.send();


