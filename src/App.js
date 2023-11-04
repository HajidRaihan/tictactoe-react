import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { restart, selectSquare } from "./gameSlice";
import store from "./store";

function Board() {
  const squares = useSelector((state) => state.game.squares);
  const nextValue = useSelector((state) => state.game.nextValue);
  const winner = useSelector((state) => state.game.winner);
  const dispatch = useDispatch();

  const handleSquareClick = (square) => {
    dispatch(selectSquare(square));
  };

  const handleRestart = () => {
    dispatch(restart());
  };

  function renderSquare(i) {
    return (
      <button
        className="w-40 h-40 m-2 p-0 rounded-xl bg-[#183D3D]  relative"
        onClick={() => handleSquareClick(i)}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-medium">
          {squares[i]}
        </div>
      </button>
    );
  }

  return (
    <div>
      <div className="text-center text-white font-semibold text-5xl pb-5 uppercase">
        {winner ? `Winner: ${winner}` : `Next Player: ${nextValue}`}
      </div>
      <div>
        <div>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button
        onClick={handleRestart}
        className="flex justify-center bg-[#183D33] hover:bg-[#183D3D] w-64 mx-auto  mt-5 h-16  items-center rounded-xl text-white font-semibold uppercase"
      >
        Restart
      </button>
    </div>
  );
}

function Game() {
  const [welcome, setWelcome] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setWelcome(false);
    }, 3000);
  }, []);
  return (
    <div>
      <div>
        {welcome ? (
          <p className="text-5xl text-white uppercase font-bold animate-bounce">
            selamat bermain ...
          </p>
        ) : (
          <Board />
        )}
      </div>
    </div>
  );
}

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App;
