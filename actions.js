
const form = document.getElementById("participantForm");
const input = document.getElementById("participantName");
const list = document.getElementById("participantsList");
const total = document.getElementById("total");
const winnerBox = document.getElementById("winner");

let participants = JSON.parse(
  localStorage.getItem("cakeParticipants") || "[]"
);

function save() {
  localStorage.setItem(
    "cakeParticipants",
    JSON.stringify(participants)
  );
}

function render() {
  list.innerHTML = "";

  participants.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });

  total.textContent = `Total: ${participants.length}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = input.value.trim();

  if (!name) return;

  const exists = participants.some(
    (person) => person.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    winnerBox.textContent = "This participant already exists!";
    return;
  }

  participants.push(name);
  save();
  render();

  winnerBox.textContent = "";
  input.value = "";
  input.focus();
});

document.getElementById("raffleBtn").addEventListener(
  "click",
  () => {
    if (participants.length === 0) {
      winnerBox.textContent = "Add participants first!";
      return;
    }

    const index = Math.floor(
      Math.random() * participants.length
    );

    const winner = participants[index];

    winnerBox.textContent = `🏆 Winner: ${winner}! 🎂`;
  }
);

document.getElementById("resetBtn").addEventListener(
  "click",
  () => {
    if (!confirm("Reset all participants?")) return;

    participants = [];
    save();
    render();
    winnerBox.textContent = "";
  }
);

render();
