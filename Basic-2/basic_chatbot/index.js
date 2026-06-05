const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

async function sendMessage() {
  const message = input.value.trim();

  if (!message) return;

  chatBox.innerHTML += `
    <div class="message user">
      ${message}
    </div>
  `;

  input.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("http://localhost:3000/chat",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    const data = await response.json();

    chatBox.innerHTML += `
      <div class="message bot">
        ${data.reply}
      </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.error(error);

    chatBox.innerHTML += `
      <div class="message bot">
        Error connecting to server.
      </div>
    `;
  }
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});