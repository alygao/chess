package chess.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chess.dao.EventDao;
import chess.domain.Event;
import chess.domain.Game;

@Service
public class EventService {
	
	@Autowired
	private EventDao eventDao;

	public List<Event> getEvents() {
		return this.eventDao.getEvents();
	}

	public List<Game> getGames(int eid) {
		return this.eventDao.getGames(eid);
	}
}
