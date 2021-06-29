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
import chess.domain.Player;
import chess.domain.WinStats;
import chess.services.GameService;
import chess.services.PlayerService;

@RestController
@RequestMapping("/v1/game")
@CrossOrigin
public class GameController {
	
	@Autowired
	private GameService gameService;
	
	@GetMapping("/winstats")
	// We will only ever create users since players are created
	// from populate_db.sh
	public ResponseEntity<WinStats> getWinStats(@RequestParam("moveString") String moveString) {
		// todo: make the fields and requests actually work
		WinStats stats = gameService.getWinStats(moveString + "%");
		if (stats == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(stats);
	}
}
