var ElementCursor = {
  cursorElement: "",
  setCursor: function (cursorId) {
    $("html").css({
      cursor: "none",
    });
    ElementCursor.cursorElement = cursorId;
    ElementCursor.updateCursor();
  },
  removeCursor: function () {
    $("html").css({
      cursor: "",
    });
    ElementCursor.cursorElement = "";
  },
  updateCursor: function () {
    $(document).mousemove(function (e) {
      $("#" + ElementCursor.cursorElement).css({
        position: "fixed",
        top: e.pageY + 2 + "px",
        left: e.pageX + 2 + "px",
      });
    });
  },
};

ElementCursor.setCursor("cursor");

let isPlay = false;

let x = 0,
  y = 0;

let score = 0,
  health = 3;

let scoreBoard = document.createElement("p");
scoreBoard.style.position = "absolute";
scoreBoard.style.top = "0px";
scoreBoard.style.right = "0px";
scoreBoard.style.zIndex = "3";
scoreBoard.style.color = "red";
scoreBoard.innerHTML = "Score: " + score;

document.body.appendChild(scoreBoard);

let healthDisplay = document.createElement("p");
healthDisplay.style.position = "absolute";
healthDisplay.style.top = "15px";
healthDisplay.style.right = "0px";
healthDisplay.style.zIndex = "3";
healthDisplay.style.color = "green";
healthDisplay.innerHTML = "Health: " + health;

document.body.appendChild(healthDisplay);

let gameOverText = document.createElement("p");
gameOverText.style.position = "absolute";
gameOverText.style.top = "50%";
gameOverText.style.left = "50%";
gameOverText.style.color = "red";
gameOverText.style.fontSize = "50px";
gameOverText.innerHTML = "Game Over";

gameOverText.onclick = function () {
  location.reload();
};

function killEnemy(e) {
  e.target.remove();
  score += 1;

  scoreBoard.innerHTML = "Score: " + score;
}

function gameOver() {}

function renderEnemy() {
  x = Math.random() * window.innerWidth - 50;
  y = Math.random() * window.innerHeight - 50;

  let en = Math.random() * 100;

  let enemy = document.createElement("img");

  if (en < 50) {
    enemy.src = "./images/enemy.png";
  } else {
    enemy.src = "./images/enemy2.jpeg";
  }

  enemy.style.position = "absolute";
  enemy.style.top = y + "px";
  enemy.style.left = x + "px";
  enemy.style.width = "100px";
  enemy.style.height = "100px";
  enemy.style.objectFit = "contain";
  enemy.style.zIndex = "-1";

  enemy.onclick = killEnemy;

  document.body.appendChild(enemy);

  setTimeout(() => {
    if (document.body.contains(enemy)) {
      enemy.remove();
      document.body.style.backgroundColor = "rgba(232,0,0,0.3)";
      setTimeout(() => {
        document.body.style.backgroundColor = "white";
      }, 500);
      health -= 1;
      healthDisplay.innerHTML = "Health: " + health;

      if (health <= 0) {
        document.body.appendChild(gameOverText);
        isPlay = false;
      }
    }
  }, 3000);
}

document.getElementById("start").onclick = function () {
  isPlay = true;
  this.remove();
};

setInterval(() => {
  if (isPlay === true) {
    renderEnemy();
  }
}, 5000);
