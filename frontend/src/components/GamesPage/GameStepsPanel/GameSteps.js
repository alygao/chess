function GameSteps({
    moves,
    mostRecentMove
  }) {
    return (
        <div>
            Game Steps
            {moves.map((move, i) =>
                <h3 key={i}>
                    {move.to}
                </h3>
            )}

            <p>{mostRecentMove.to}</p>
        </div>
    );
}

export default GameSteps;