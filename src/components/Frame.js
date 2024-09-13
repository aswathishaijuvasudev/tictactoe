

import React, { useState, useEffect } from "react";

export const Frame = () => {
    const initialBoard = [
        { id: 0, val: "" },
        { id: 1, val: "" },
        { id: 2, val: "" },
        { id: 3, val: "" },
        { id: 4, val: "" },
        { id: 5, val: "" },
        { id: 6, val: "" },
        { id: 7, val: "" },
        { id: 8, val: "" }
    ];

    const [board, setBoard] = useState(initialBoard);
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (id) => {
        if (winner || board[id].val) return; 

        const newBoard = board.map((cell) =>
            cell.id === id ? { ...cell, val: isXNext ? "x" : "o" } : cell
        );

        setBoard(newBoard);
        setIsXNext(!isXNext); 
    };

    const checkWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a].val && board[a].val === board[b].val && board[a].val === board[c].val) {
                return board[a].val;
            }
        }
        return null;
    };

    useEffect(() => {
        // console.log("inside useEffect");
        const winner = checkWinner(board);
        console.log(winner);
        if (winner) {
            setWinner(winner);

        } else if (board.every((cell) => cell.val !== "")) {
            setWinner("Draw");
        console.log("inside useEffect");

        }
    }, [board]);

    const resetGame = () => {
        setBoard(initialBoard);
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <section>
            <div className="col-6 frameMain">
                <div className="row">
                    {!winner &&board.map((cell) => (
                        <div className="col" key={cell.id}>
                            <div className="4 column">
                                <button onClick={() => handleClick(cell.id)} className="cell">
                                    {cell.val}
                                </button>
                            </div>
                        </div>



                    ))}
                </div>
                <div className="row">
                {winner && (
                    <div className="result">
                        {winner === "Draw" ? "It's a draw!" : `${winner} wins!`}
                        <button onClick={resetGame}>Reset Game</button>
                    </div>
                )}
                </div>
            </div>
        </section>
    );
};

export default Frame;
