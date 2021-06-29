package chess.services;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chess.dao.GameDao;
import chess.dao.PlayerDao;
import chess.domain.Player;
import chess.domain.WinStats;

@Service
public class GameService {
	
	@Autowired
	private GameDao gameDao;
	
	public WinStats getWinStats(String moveString) {
		return this.gameDao.getWinStats(moveString);
	}
}
