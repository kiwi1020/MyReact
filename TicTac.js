import {useState } from "react";

const style1 = {
    background : '#86E57F',
    border : '3px solid green',
    borderRadius : '5px',
    fontSize : '30px',
    fontWeight : '800',
    margin : '-1px'
}

const style2 = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 100px)',
    gridTemplateRows: 'repeat(3, 100px)'
}

const Square = ({value, onClick}) => (
    <button style={style1} onClick={onClick}>
        {value}
    </button>
)

const Board = ({squares, onClick}) => {
    return <div style={style2}>
        {squares.map((square, index) => <Square value = {square} onClick = {() => onClick(index)}/>)}
    </div>
}

const Game = () => {
    
    const [player,setPlayer] = useState(null);
    const [board,setBoard] = useState(Array(9).fill(null));
    const winner = calculateWinner(board);

    const handleClick = (i) => {
        const copyboard = board;
        if (winner || board[i] || (player == null)) return;
        copyboard[i] = (player === 'O') ? "O" : "X";
        setBoard([...copyboard]);
        if(calculateWinner(board)) return;
        computerMoves();
    }

    const computerMoves = () => {

        for (let j = 0; j < 9; j++) {
            if(board[j] === null) break;
            if(j === 8) return ;
        }

        setTimeout(() => {
            const copyboard = board;
            let index = Math.floor(Math.random() * 8);
            while (board[index]) { index = Math.floor(Math.random() * 9); } 
            copyboard[index] = (player === 'O') ? "X" : "O";
            setBoard([...copyboard]);
        }, 500);
    }

    return (
    <>
    <Board squares={board} onClick = {handleClick}/>
    <div>
        {player ? <p>player: {player}</p> : 
        <p>
        Player:<button onClick={() => {
            setPlayer('O')
            }}>O:Offensive </button> 
        <button onClick={() => {
            setPlayer('X')
            computerMoves()
            }}>X:Defensive</button>
        </p>}

        <p>{winner ? 'Winner: ' + winner : (player == null ? "Not Selected" : 'Game Running')}</p>
    </div>
    </>
    )
}

const calculateWinner = (squares) => {
    const line = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2 ,5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    for (let i = 0; i <line.length; i++ ) {
        const [a,b,c] = line[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

const App = () => {
    return <div>
        <Game />
    </div>
}

export default App;