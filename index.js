const tiles = document.querySelectorAll(".tile")
const player_X = "X"
const player_O = "O"
let playerTurn = player_X
let playerXWins = 0
let playerOWins = 0
let totalDraws = 0

const winningLine = document.getElementById("line")
const gameOverArea = document.getElementById("game-over-area")
const gameOverMessage = document.getElementById("game-over-message")
const playAgain = document.getElementById("play-again")
const playerXCount = document.getElementById("player-x-count")
const playerOCount = document.getElementById("player-o-count")
const draws = document.getElementById("draws")
const resetScores = document.getElementById("reset-scores")

//create an array equal to how many tiles we have and fill with null. These will be changed as tiles are clicked.
const board = Array(tiles.length)
board.fill(null)

//each winning combination paired up with the relevant line that will appear on screen
const winningCombinations = [
    { combination: [1, 2, 3], line: "line-row-1" },
    { combination: [4, 5, 6], line: "line-row-2" },
    { combination: [7, 8, 9], line: "line-row-3" },
    { combination: [1, 4, 7], line: "line-column-1" },
    { combination: [2, 5, 8], line: "line-column-2" },
    { combination: [3, 6, 9], line: "line-column-3" },
    { combination: [1, 5, 9], line: "line-diagonal-1" },
    { combination: [3, 5, 7], line: "line-diagonal-2" }
]
//simple function to increment number of wins for each player and alter the text that will show on screen
const updateTotalWins = (winningPlayer) => {
    if(winningPlayer === "X"){
        playerXWins++
        playerXCount.innerText = `Player X total wins: ${playerXWins}`
    } else if(winningPlayer === "O"){
        playerOWins++
        playerOCount.innerText = `Player O total wins: ${playerOWins}`
    }
    else if (winningPlayer === null){
        totalDraws++
        draws.innerText = `Draws: ${totalDraws}`
    }
}
//simple function to change message given when the game is over
//classList change so message becomes visible
const gameOver = (winningPlayer) => {
    let result = "Draw!"
    if(winningPlayer !== null){
        result = `Player ${winningPlayer} won the game!`
        updateTotalWins(winningPlayer)
    } else if (winningPlayer=== null){
    updateTotalWins(null)
    }
    gameOverArea.classList = 'visible'
    gameOverMessage.innerText = result
}
// combinations act as index values to look into our board. Has to be -1 because board is indexed, so position 1 is board[0]
// if all 3 values equal (and not null) they we have winning combination
// adds the coloured line classList and invokes gameOver with winning player
const checkWinningCombination = () => {
    for(const winningCombo of winningCombinations){
        const { combination, line } = winningCombo
        const value1 = board[combination[0]-1]
        const value2 = board[combination[1]-1]
        const value3 = board[combination[2]-1]

        if(value1 !== null && value1 === value2 && value1 === value3){
            winningLine.classList.add(line)
            gameOver(value1)
            return;
        }
    }
// if board is full and now winner found, invoke gameOver with null
const completeBoard = board.every((tile) => tile !== null)
if(completeBoard){
    gameOver(null)
}
}

const clickTile = (event) => {
    // if visible classList present, this means the game is over so do nothing
    if(gameOverArea.classList.contains("visible")) {
        return;
    }
    const selectedTile = event.target
    // data-index given to each tile with number 1-9 so can be identified
    const selectedTileNumber = selectedTile.dataset.index
    // if a tile already has text in it, it has already been selected, therefore do nothing
    if(selectedTile.innerText !== ""){
        return;
    }
    // sets text on screen to player, reassigns value within board position to player, then changes player
    if(playerTurn === player_X){
        selectedTile.innerText = player_X
        board[selectedTileNumber-1] = player_X
        playerTurn = player_O
       
    } else {
        selectedTile.innerText = player_O
        board[selectedTileNumber-1] = player_O
        playerTurn = player_X
      
    }
    //invokes hoverMarker so hovers work again then checks current game state against the winning combinations
    hoverMarker()
    checkWinningCombination()
}
// first remove and current hovers, assign variable with relevant player turn, then add that class to every tile
const hoverMarker = () => {
    tiles.forEach((tile) => {
        tile.classList.remove("x-hover")
        tile.classList.remove("o-hover")
    })

    const playerTurnHover = `${playerTurn.toLowerCase()}-hover`

    tiles.forEach((tile) => {
        if(tile.innerText == ""){
            tile.classList.add(playerTurnHover)
        }
    })
}
//invoke 
hoverMarker()

tiles.forEach((tile) => {
    tile.addEventListener("click", clickTile)
})
// resets game
const startNewGame = () => {
    winningLine.className = "line"
    gameOverArea.className = "hidden"
    board.fill(null)
    tiles.forEach((tile) => tile.innerText= "" )
    hoverMarker()
}

const resetScore = () => {
    startNewGame()
    // winningLine.className = "line"
    // gameOverArea.className = "hidden"
    // board.fill(null)
    // tiles.forEach((tile) => tile.innerText= "" )
    // hoverMarker()
    playerOWins = 0
    playerXWins = 0
    totalDraws = 0
    playerXCount.innerText = `Player X total wins: 0`
    playerOCount.innerText = `Player O total wins: 0`
    draws.innerText = `Draws: 0`
}

playAgain.addEventListener("click", startNewGame)
resetScores.addEventListener("click", resetScore)
