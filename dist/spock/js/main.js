
var myGamePiece;
var myObstacles = [];
var mySound;
var myMusic;
var myScore;
var myBackground;

var myHighScore = [
    { name: "Capt. James T. Kirk", score: 5800 },    // - 0
  { name: "Lt. Cmdr. Spock", score: 4750 },        // - 1
  { name: "Dr. Leonard McCoy", score: 3700 },      // - 2
  { name: "Montgomery Scott", score: 650 },       // - 3
  { name: "Lt. Hikaru Sulu", score: 600 },        // - 4
  { name: "KaLt. Uhurarl", score: 550 },          // - 5
  { name: "Pavel Chekov", score: 430 },           // - 6
  { name: "Pavel Chekov", score: 420 },           // - 7
  { name: "Pavel Chekov", score: 300 },           // - 8

];

function restart() {
    myGameArea.stop();
    myMusic.stop();
    myGameArea.clear();
    startGame();
}
function stopGame() {
    myGameArea.stop();
    myMusic.stop();
    myGameArea.clear();
}

async function loadJSONfile() {
  try {
  let restoreEntries = localStorage.getItem("spock-entries");
  if (restoreEntries !== null) {
    myHighScore = [];
      JSON.parse(restoreEntries).forEach(entry => {
        // console.log(entry);
          myHighScore.push(entry);
      })
  }
  }catch (fehler) {
  console.log('Holy shit! - an ERROR has occured --> ', fehler);
  }
  }
  
  loadJSONfile();

/**
 * this function expression calls all the components needed.
 * It clears the myObstacles Array to make the restart() function work and 
 * invokes the method start() of the myGameArea object.
 * 
 */
function startGame() {
    /**
     * instead of refering to a color, we refer to an URL to use an image as the gamepiece
     * the first to myGamepiece numbers are for the image size.
     * the last 2 number are to where the image starts Left - Top
     */
    
    myGamePiece = new component(650, 650, "./dist/spock/img/spock.png", 1800, 800, "image");
    myBackground = new component(3900, 3900, "./dist/spock/img/space.jpg", 0, 0, "image");
    myScore = new component("300px", "Consolas", "white", 1200, 300, "text");
    mySound = new sound("./dist/spock/sounds/nomaderr.mp3");
    myMusic = new sound("./dist/spock/sounds/EpisodeEnding6Times.mp3");
    myMusic.play();
    myObstacles = [];
    myGameArea.start();
}
/**
 * this object and it's methods creates the game area.
 * the canvas element has a build in object getContext("2d").
 * the start function gets invoked by the startGame function
 */
var myGameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        let heightRatio = .7;
        canvas.width = 3660;
        canvas.height = canvas.width * heightRatio;
        // the getContext("2d") object has a build-in imge property to use an image as a gamepiece.
        this.context = this.canvas.getContext("2d");
        let canvasContainer = document.getElementById("canvasContainer");
        canvasContainer.insertBefore(this.canvas, canvasContainer.childNodes[0]);
        // document.body.insertBefore(this.canvas, document.body.childNodes[1]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);
        // To move Spock with the keyboard
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
          })
          window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
          })
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
} 

/**
 *  === COMPONENTS === //--------------------------------------------------------------------//
 * the component constructor adds components onto the gamearea.
 * @param {* width parameter} width 
 * @param {* height parameter} height 
 * @param {* color parameter} color 
 * @param {* x-coordinate, horizontal } x 
 * @param {* y coordinate, vertical} y 
 * @param {* type parameter} type 
 */
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
      this.image = new Image();
      this.image.src = color;
    }
    this.width = width;
    this.height = height;
    // speed indicators
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
      ctx = myGameArea.context;
      if (type == "image" || type == "background") {
        ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
        if (type == "background") {
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
          } 
      } else if (this.type == "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
      } 
       else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

    } 
    /**
     * this function uses the speed properties to change
     * the components position. The newPos function is called from the 
     * updateGameArea function before drawing the component
     */
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
              this.x = 0;
            }
          }        
    }    


    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
           
        }
        return crash;
    }
}  

/* Update - Game-Area */ //--------------------------------------------------------------------//

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            mySound.play();
            myMusic.stop();
            myGameArea.stop(); 
            checkScoreForHighscore();
            return;
        } 
    }
    myGameArea.clear();
    // To Move Spock with the Keyboard
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -4; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX =  4; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -4; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY =  4; }

    myBackground.newPos();
    myBackground.update();
    myGamePiece.newPos();
    myGamePiece.update();
    // myBackground.speedX = -1;
    myGameArea.frameNo += 1;

    /**
     * creates and updates the obstacles in every frame
     * everyinterval changes the amount of obstacles the higher the number
     * the lesser the obstacles
     */
    if (myGameArea.frameNo == 1 || everyinterval(900)) {
        x = myGameArea.canvas.width;
        minHeight = 400;
        maxHeight = 800;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 850;
        maxGap = 1020;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(90, height, "green", x, 1));
        myObstacles.push(new component(90, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x -= 1;
        myObstacles[i].update();
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    
} // Function UPDATE-GAMEAREA END



/**
 * === SOUND === //--------------------------------------------------------------------//
 * function to set the properties and to to control the sound
 * @param {* the source parameter to get the location of the soun file} src 
 */
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

/* === HIGHSCORE === */ //--------------------------------------------------------------------//


function retrieveFormData (userInput){

  let objScore = {
      name: userInput.target.elements.username.value,
      score: myGameArea.frameNo,
  }

  sortEntries(); 
  myHighScore.push(objScore);
  document.getElementById("myModal2").style.display = "none"; 
  saveToLocalStorage();
  displayHighscore();
  reduceArrayToMaxTenUser();
}

  let checkScoreForHighscore =()=>{
    if (myHighScore.length <= 10 && myHighScore[8].score < myGameArea.frameNo)
    {
      document.getElementById("myModal2").style.display = "block";  
    }    else {
      alert("Game Over - You're not ready for the Highscore - try again!")
    }
}

  let submitEvent = () => {
      document.querySelector("#formField").addEventListener("submit", submitEvent => {
            submitEvent.preventDefault(); 
          retrieveFormData(submitEvent);     
  });        
}

function sortEntries(){
    myHighScore.sort((entry_a, entry_b) => {
        if (entry_a.score > entry_b.score) {
            return -1;
        } else if (entry_a.score < entry_b.score) {
            return 1;
        }
    });
}

function reduceArrayToMaxTenUser () {
  if (myHighScore.length  >= 10){
      myHighScore.pop();
      sortEntries(); 
      saveToLocalStorage();
  }
}

function removeEntries (){
    let childNote =  document.getElementById("container");
    if (childNote !== null) {
      childNote.remove();
    }
}

function createContainer () {
  removeEntries();
  let container =  document.getElementById("modalBody");
  let div = document.createElement("div");
  div.setAttribute("id", "container");
  container.insertAdjacentElement("afterend", div );
}


function displayHighscore () {
    removeEntries();
    createContainer();
    let modalBody =  document.getElementById("container");
          for (let i = 0; i< myHighScore.length; i++)
          {
              let name = myHighScore[i].name;
              let score = myHighScore[i].score;
              modalBody.innerHTML += `<p class="modalEntry">Score: ${score}  -----  ${name}</p>`;
          }
              document.getElementById("myModal").style.display = "block";
  }


function saveToLocalStorage () {
    sortEntries();
    localStorage.setItem("spock-entries", JSON.stringify(myHighScore));
 }

submitEvent();


/* === THE MODAL HIGHSCORE === */ //------------------------------------------------------------//

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  displayHighscore();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


/* === THE MODAL ENTER NAME === */

// Get the modal
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn2 = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
// btn2.onclick = function() {
//   modal2.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

/* === TYPEWRITER === */ //------------------------------------------------------------//

// Zeichenkette
var myString = " Live long and prosper. – Spock Quote, -- First spoken in Star Trek, Season 2, Episode 1 (“Amok Time,” 1968) " ;
// Trennzeichen zum Zeichensplit
var myArray = myString.split("");
var loopTimer;

function frameLooper() {
	// Zeichen hintereinander anfügen
	if(myArray.length > 0) {
		document.getElementById("myTypingText").innerHTML += myArray.shift();
	} else {
		clearTimeout(loopTimer); 
                return false;
	}
	// Timer pro Zeichen
	loopTimer = setTimeout('frameLooper()',70);
}
frameLooper();
