package chess.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chess.domain.CreateUserRequest;
import chess.domain.Game;
import chess.services.PlayerService;

@RestController
@RequestMapping("/v1/events")
@CrossOrigin
public class EventController {
	
	@Autowired
	private EventService eventService;

	@GetMapping("/events")
	public ResponseEntity<List<Event>> getEvents() {
		List<Player> events = eventService.getEvents();
		if (events == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(events);
	}

	@GetMapping("/")
	public ResponseEntity<List<Game>> getGames(@RequestParam("name") int name) {
		List<Game> games = eventService.getGames(name, true, true, true);
		if (players == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(games);
	}
}
