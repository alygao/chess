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
import chess.domain.FavouritedGame;
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
			// todo: this is slow
			Move move = new Move();
			String currentMoveString;
			if (previousMovesString.length() == 0) {
				currentMoveString = m;
			} else {
				currentMoveString = previousMovesString + "-" + m;
			}
			WinStats stats = this.gameDao.getWinStats(currentMoveString);
			move.setWinStats(stats);
			move.setMoveString(m);
			result.add(move);
		}
		return result;
	}

	public List<Game> getGames(int pid) {
		// get player and game data
		return this.gameDao.getGames(pid);
	}
	
	public List<Game> getUserFavouritedGames(String username) {
		// get player and game data
		return this.gameDao.getUserFavouritedGames(username);
	}
	
	public void removeUserFavouritedGame(int gid, String username) {
		this.gameDao.removeUserFavouritedGame(gid, username);
	}
	
	public FavouritedGame addUserFavouritedGame(FavouritedGame favouritedGame) {
		return this.gameDao.addUserFavouritedGame(favouritedGame);
	}

	public List<Game> getGames(String playerName, boolean viewBlackWinGames, boolean viewWhiteWinGames,
			boolean viewDrawGames) {
		// get player and game data
		return this.gameDao.getGames(playerName, viewBlackWinGames, viewWhiteWinGames, viewDrawGames);
	}

	public Game getGame(int gid) {
		// get gama data
		return this.gameDao.getGame(gid);
	}

	public List<Move> getMoves(int gid) {
		// get player and game date
		return this.gameDao.getMoves(gid);
	}

}
