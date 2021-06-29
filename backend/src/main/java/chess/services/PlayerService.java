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
		// String greeting = "";
		// if (Calendar.getInstance().get(Calendar.HOUR_OF_DAY) < 12 ) {
		// 	greeting += "Good Morning, " + name;
		// } else if (Calendar.getInstance().get(Calendar.HOUR_OF_DAY) < 18 ) {
		// 	greeting += "Good Afternoon, " + name;
		// } else {
		// 	greeting += "Good Evening, " + name;
		// }
		
		return this.playerDao.createUser(name, username, password);
	}

	public List<Player> getPlayers(String name) {
		return this.playerDao.getPlayers(name);
	}
}
