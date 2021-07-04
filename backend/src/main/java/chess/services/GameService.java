package chess.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chess.dao.GameDao;
import chess.dao.PlayerDao;
import chess.domain.Game;
import chess.domain.Move;
import chess.domain.Player;
import chess.domain.WinStats;

@Service
public class GameService {
	
	@Autowired
	private GameDao gameDao;
	
	public WinStats getWinStats(String moveString) {
		return this.gameDao.getWinStats(moveString);
	}

	public List<Move> getCandidateMoves(String previousMovesString) {
		// 1. get N games with the prefix moveString
		// 2. get winstats for each of them
		// 3. sort and return
		Set<String> candidateMoveStrings = this.gameDao.getCandidateMoves(previousMovesString);
		List<Move> result = new ArrayList<>();
		for (String m : candidateMoveStrings) {
			//todo: this is slow
			Move move = new Move();
			String[] sanMoves = m.split("-");
			move.setTurnNum(sanMoves.length-1);
			move.setMoveString(sanMoves[sanMoves.length-1]);
			WinStats stats = this.gameDao.getWinStats(m);
			move.setWinStats(stats);
			result.add(move);
		}
		return result;
	}

	public List<Game> getGames(int pid) {
		// get player and game date
		return this.gameDao.getGames(pid);
	}
	
	public List<Game> getGames(String playerName, boolean viewBlackWinGames, boolean viewWhiteWinGames, boolean viewDrawGames) {
		// get player and game date
		System.out.println("IN SERVICE.........");
		return this.gameDao.getGames(playerName, viewBlackWinGames, viewWhiteWinGames, viewDrawGames);
	}

	public List<Move> getMoves(int gid) {
		// get player and game date
		return this.gameDao.getMoves(gid);
	}

}
