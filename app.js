const socket = io('http://194.116.77.117:3000')
const chat = document.querySelector('.chat-form')
const chatInput = document.querySelector('.chat-input')
var user = "Mario Rossi";

chat.addEventListener('submit', e => {
  e.preventDefault()
  mms = chatInput.value
  socket.emit('chat', {"message": mms, "name": user})
  chatInput.value = ''
})

var room = window.location.pathname;

socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
   socket.emit('room', room);
});

var stringToColour = function(str) {
   var hash = 0;
   for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
   }
   var colour = '#';
   for (var i = 0; i < 3; i++) {
       var value = (hash >> (i * 8)) & 0xFF;
       colour += ('00' + value.toString(16)).substr(-2);
   }
   return colour;
}

const chatDump = document.querySelector('.chat-dump')
const render = ({message, name}) => {
   const div = document.createElement('div')
   div.classList.add('message')
   const author = document.createElement('div')
   author.classList.add('author')
   author.textContent = name+": "
   author.style.color = stringToColour(name);
   div.appendChild(author)
   const mm = document.createElement('div')
   mm.classList.add('chat-message');
   mm.textContent = message;
   div.appendChild(mm)
   chatDump.appendChild(div)
   chatDump.scrollTop = chatDump.scrollHeight; // auto-scroll
}
socket.on('chat', data => {
   console.log(data.message)
   render(data.message)
})

function getUsername(){
   // Selecting the input element and get its value 
   user = document.getElementById("Username").value;
   if (user== ""){
      alert("Inserisci un nome utente valido")
   }
   else{
      document.getElementById("username").style.display = "none";
      document.getElementById("chat").style.display = "block";
   }
}

var input = document.getElementById("Username");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   getUsername();
  }
});