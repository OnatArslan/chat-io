const chatForm = document.getElementById(`chat-form`);

const socket = io();

socket.on(`message`, (message) => {
  console.log(message);
});

// Message submit
chatForm.addEventListener(`submit`, (event) => {
  event.preventDefault();
  // Get message text from form on frontend
  const msg = event.target.elements.msg.value;
  console.log(msg);

  // Emitting a message to server
  socket.emit(`chatMessage`, msg);
});
