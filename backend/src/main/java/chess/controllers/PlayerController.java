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
import chess.domain.GetPlayersRequest;
import chess.domain.Player;
import chess.services.PlayerService;

@RestController
@RequestMapping("/v1/player")
@CrossOrigin
public class PlayerController {
	
	@Autowired
	private PlayerService playerService;
	
	@PostMapping("/")
	// We will only ever create users since players are created
	// from populate_db.sh
	public ResponseEntity<String> createUser(@RequestBody CreateUserRequest r) {
		// todo: make the fields and requests actually work
		System.out.println("username = " + r.getUsername() );
		int id = playerService.createUser(r.getName(), r.getUsername(), r.getPassword());
		if (id == -1){
			return ResponseEntity.badRequest().body("probably a duplicate user");
		}
		return ResponseEntity.ok().body("");
	}

	@GetMapping("/")
	// We will only ever create users since players are created
	// from populate_db.sh
	public ResponseEntity<List<Player>> getPlayers(@RequestParam("name") String name) {
		// todo: make the fields and requests actually work
		List<Player> players = playerService.getPlayers(name);
		if (players == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(players);
	}
}
