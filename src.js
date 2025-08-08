
// let audioTurn = new Audio("ting.mp3")
// let gameOver = new Audio("gameOver.wav")
// let turn = "X"
// let isGameOver = false;

// // Function to change the turn
// const changeTurn = ()=>{
//     return turn === "X"? "0": "X"
// }

// // Function to check for a win
// const checkWin = ()=>{
//     let boxText = document.getElementsByClassName('boxText')
//     let wins = [
//         [0,1,2,5,5,0],
//         [3,4,5,5,15,0],
//         [6,7,8,5,25,0],
//         [0,3,6,-5,15,90],
//         [1,4,7,5,15,90],
//         [2,5,8,15,15,90],
//         [0,4,8,5,15,45],
//         [2,4,6,5,15,135],
//     ]
//     wins.forEach(e =>{
//         if((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[1]].innerText) && (boxText[e[0]].innerText  !== "")){
//           document.querySelector('.info').innerText = boxText[e[0]].innerText + " won"; 
//           isGameOver = true;
//           document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px"
//           document.querySelector(".line").style.width = "20vw"
//           document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
//           gameOver.play()
//         }
//     })
// }

// // Game logic

// let boxes = document.getElementsByClassName("box");
// Array.from(boxes).forEach(element =>{
//     let boxText = element.querySelector('.boxText');
//     element.addEventListener('click', ()=>{
//         if(boxText.innerText === ''){
//             boxText.innerText = turn;
//             turn = changeTurn();
//             audioTurn.play()
//             checkWin();
//             if(!isGameOver){
//             document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
//             }
//         }
//     })
// })

// // Add onclick listener to reset button
// reset.addEventListener('click', ()=>{
//     let boxTexts = document.querySelectorAll('.boxText');
//     Array.from(boxTexts).forEach(e =>{
//         e.innerText = ""
//     });
//     turn = "X"
//     isGameOver = false;
//         document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    
//           document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
//           document.querySelector(".line").style.width = "0vw"
          
// })


let audioTurn = new Audio("ting.mp3")
let gameOver = new Audio("gameOver.wav")
let turn = "X"
let isGameOver = false;

const changeTurn = () => turn === "X" ? "0" : "X";

const wins = [
    [0, 1, 2],  // top row
    [3, 4, 5],  // middle row
    [6, 7, 8],  // bottom row
    [0, 3, 6],  // left column
    [1, 4, 7],  // middle column
    [2, 5, 8],  // right column
    [0, 4, 8],  // diagonal top-left to bottom-right
    [2, 4, 6]   // diagonal top-right to bottom-left
];

function drawLine(winCombo) {
    const container = document.querySelector('.container');
    const boxes = container.querySelectorAll('.box');
    const startBox = boxes[winCombo[0]];
    const endBox = boxes[winCombo[2]];
    
    // Get positions relative to container
    const containerRect = container.getBoundingClientRect();
    const startRect = startBox.getBoundingClientRect();
    const endRect = endBox.getBoundingClientRect();
    
    // Calculate center points (in percentages)
    const startX = ((startRect.left + startRect.width/2) - containerRect.left) / containerRect.width * 100;
    const startY = ((startRect.top + startRect.height/2) - containerRect.top) / containerRect.height * 100;
    const endX = ((endRect.left + endRect.width/2) - containerRect.left) / containerRect.width * 100;
    const endY = ((endRect.top + endRect.height/2) - containerRect.top) / containerRect.height * 100;
    
    // Calculate line length and angle
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) * 1.2;
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    
    // Apply styles
    const line = document.querySelector('.line');
    line.style.width = `${length}%`;
    line.style.left = `${startX}%`;
    line.style.top = `${startY}%`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 0';
}

const checkWin = () => {
    const boxTexts = document.getElementsByClassName('boxText');
    
    for (const combo of wins) {
        const [a, b, c] = combo;
        if (boxTexts[a].innerText && 
            boxTexts[a].innerText === boxTexts[b].innerText && 
            boxTexts[a].innerText === boxTexts[c].innerText) {
            
            document.querySelector('.info').innerText = `${boxTexts[a].innerText} won`;
            isGameOver = true;
            document.querySelector('.imgbox img').style.width = "200px";
            drawLine(combo);
            gameOver.play();
            return;
        }
    }
};

Array.from(document.getElementsByClassName("box")).forEach(box => {
    const boxText = box.querySelector('.boxText');
    box.addEventListener('click', () => {
        if (boxText.innerText === '' && !isGameOver) {
            boxText.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isGameOver) {
                document.querySelector(".info").innerText = `Turn for ${turn}`;
            }
        }
    });
});

document.getElementById('reset').addEventListener('click', () => {
    document.querySelectorAll('.boxText').forEach(box => {
        box.innerText = "";
    });
    turn = "X";
    isGameOver = false;
    document.querySelector(".info").innerText = "Turn for X";
    document.querySelector('.imgbox img').style.width = "0px";
    
    const line = document.querySelector('.line');
    line.style.width = "0";
    line.style.left = "0";
    line.style.top = "0";
    line.style.transform = "rotate(0deg)";
});