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
import chess.domain.Event;
import chess.domain.Game;
import chess.services.EventService;

@RestController
@RequestMapping("/v1/events")
@CrossOrigin
public class EventController {
	
	@Autowired
	private EventService eventService;

	@GetMapping("/events")
	public ResponseEntity<List<Event>> getEvents() {
		System.out.println("hullo");;
		List<Event> events = eventService.getEvents();
		if (events == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(events);
	}

	@GetMapping("/games")
	public ResponseEntity<List<Game>> getGames(@RequestParam("eid") int eid) {
		System.out.println("hello");
		List<Game> games = eventService.getGames(eid);
		if (games == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(games);
	}
}
