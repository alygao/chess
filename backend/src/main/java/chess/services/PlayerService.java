package chess.services;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chess.dao.PlayerDao;
import chess.domain.Player;

@Service
public class PlayerService {
	
	@Autowired
	private PlayerDao playerDao;
	
	public int createUser(String name, String username, String password) {
		
		return this.playerDao.createUser(name, username, password);
	}

	public List<Player> getPlayers(String name) {
		return this.playerDao.getPlayers(name);
	}
	
	public String getNameOfUser(String username) {
		return this.playerDao.getNameOfUser(username);
	}

	public Integer login(String username, String password) {
		return this.playerDao.login(username, password);
	}
}
