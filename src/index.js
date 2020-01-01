
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
    
function Square(props) {
	return  (
	 <button className="square" onClick={props.onClick}>
	   {props.value}
	 </button>
	);
}   
   
class Board extends React.Component {
    renderSquare(i) {
        return (
          <Square						
    	      value = {this.props.squares[i]}		
        	  onClick = {() => this.props.onClick(i)}	
          />							
        );
    }

    render() {
        return (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
  }
}

class Game extends React.Component {
  constructor(props){
     super(props);
     this.state = {
         history: [{
             squares: Array(9).fill(null),
         }],
         xIsNext: true,
         xGameOver: false,
         xStepNum: 0,
     };
  }

    jumpToMove(i) {

        if (!this.state.xGameOver)
            return;

        this.setState({
            xStepNum: i,
            xIsNext: (i % 2) === 0,
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.xStepNum +1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.state.xGameOver === true || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xStepNum: history.length,
            xIsNext: !this.state.xIsNext,    
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.xStepNum];
        const winner = calculateWinner(current.squares);
        const tie = checkForTie(current.squares);

        const moves = history.map((step, move) => {
            const descr = move ?
               /* 'Move # ' + move :  */
                'Player ' + ((move % 2) ? 'X' : 'O') :
                'Start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpToMove(move)} > {descr}
                    </button>
                </li>
            );
        });
 

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
            if (!this.state.xGameOver) {
                this.setState({ xGameOver: true, });
            }
        } else if (tie) {
            status = "Tie Game";
            if (!this.state.xGameOver) {
                 this.setState({ xGameOver: true, });
            }
        } else {
            status = status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }



        return (
            <div className="game">
              <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
              </div>
              <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
              </div>
            </div>
        );
      }
}
      
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function checkForTie(squares) {
    var count = 0;
    for (let i = 0; i < 9; i++) {
        if (squares[i]) {
            count++;
        }
    }
    if (count === 9)
        return true;

    return false;
}
