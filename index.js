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

const board = Array(tiles.length)
board.fill(null)

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

const completeBoard = board.every((tile) => tile !== null)
if(completeBoard){
    gameOver(null)
}
}

const clickTile = (event) => {
    if(gameOverArea.classList.contains("visible")) {
        return;
    }
    const selectedTile = event.target
    const selectedTileNumber = selectedTile.dataset.index

    if(selectedTile.innerText !== ""){
        return;
    }
    if(playerTurn === player_X){
        selectedTile.innerText = player_X
        board[selectedTileNumber-1] = player_X
        playerTurn = player_O
       
    } else {
        selectedTile.innerText = player_O
        board[selectedTileNumber-1] = player_O
        playerTurn = player_X
      
    }
    hoverMarker()
    checkWinningCombination()
}

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

hoverMarker()

tiles.forEach((tile) => {
    tile.addEventListener("click", clickTile)
})

const startNewGame = () => {
    winningLine.className = "line"
    gameOverArea.className = "hidden"
    board.fill(null)
    tiles.forEach((tile) => tile.innerText= "" )
    hoverMarker()
}

const resetScore = () => {
    winningLine.className = "line"
    gameOverArea.className = "hidden"
    board.fill(null)
    tiles.forEach((tile) => tile.innerText= "" )
    hoverMarker()
    playerOWins = 0
    playerXWins = 0
    totalDraws = 0
    playerXCount.innerText = `Player X total wins: 0`
    playerOCount.innerText = `Player O total wins: 0`
    draws.innerText = `Draws: 0`
}

playAgain.addEventListener("click", startNewGame)
resetScores.addEventListener("click", resetScore)
