import React from "react";

const pieces = [
    "King",
    "Queen",
    "Rook",
    "Bishop",
    "Knight",
    "Pawn"  
];

function ChessPattern({pattern, setPattern}) {
    const handleClick = (piece) => {
        if (pattern.length >= 4) {
            alert("Pattern must be 4 pieces or less");
            return;
            };
            setPattern([...pattern, piece]);
        };
        

        return (
            <div>

                <h2>Select 4 of your favorite chess pieces</h2>
                <div className="pieces" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>

                    {pieces.map((piece) => (
                        <button key={piece} onClick={() => handleClick(piece)} style={{ padding: "10px 20px", fontSize: "16px" }}>
                            {piece}
                        </button>
                    ))}
                </div>

                <h4>Your selected Pattern</h4>

                
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    {pattern.map((piece, index) => (
                        <span key={index}>
                            {piece} 
                        </span>
                    ))}

                </div>
                
            </div>
        );
    }

export default ChessPattern;