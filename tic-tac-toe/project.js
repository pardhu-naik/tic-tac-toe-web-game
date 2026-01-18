const cells = document.querySelectorAll(".Box");
const resetButton = document.querySelector(".Reset");

let userTurn = true;    
let matchOver = false;   

const winLines = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!cell.disabled && userTurn && !matchOver) {
      playUser(cell);
      setTimeout(() => {
        if (!matchOver) {
          playComputer();
        }
      }, 400);
    }
  });
});

function playUser(cell) {
  cell.innerText = "O";
  cell.classList.add("oMark");
  cell.disabled = true;

  checkResult("O");
  userTurn = false;
}

function playComputer() {
  let available = [];

  cells.forEach((c, i) => {
    if (!c.disabled) {
      available.push(i);
    }
  });

  if (available.length === 0) return;

  let choice = available[Math.floor(Math.random() * available.length)];
  let compCell = cells[choice];

  compCell.innerText = "X";
  compCell.classList.add("xMark");
  compCell.disabled = true;

  checkResult("X");
  userTurn = true;
}

function checkResult(player) {
  for (let line of winLines) {
    let [i, j, k] = line;

    let v1 = cells[i].innerText;
    let v2 = cells[j].innerText;
    let v3 = cells[k].innerText;

    if (v1 !== "" && v1 === v2 && v2 === v3) {
      matchOver = true;

      setTimeout(() => {
        alert(player === "O" ? "🎉 You Won!" : "💻 Computer Won!");
      }, 120);

      lockBoard();
      return;
    }
  }

  let filled = [...cells].every(c => c.disabled);
  if (filled && !matchOver) {
    matchOver = true;
    setTimeout(() => alert("🤝 Draw!"), 120);
  }
}

function lockBoard() {
  cells.forEach(c => c.disabled = true);
}

resetButton.addEventListener("click", () => {
  cells.forEach(c => {
    c.innerText = "";
    c.disabled = false;
    c.classList.remove("xMark", "oMark");
  });

  matchOver = false;
  userTurn = true;
});
