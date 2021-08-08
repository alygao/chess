package chess.controllers;

import java.rmi.ServerException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chess.domain.CreateUserRequest;
import chess.domain.FavouritedGame;
import chess.domain.Game;
import chess.domain.Move;
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
	public ResponseEntity<WinStats> getWinStats(@RequestParam("moveString") String moveString) {
		WinStats stats = gameService.getWinStats(moveString);
		if (stats == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(stats);
	}

	@GetMapping("/candidate_moves")
	// Returns possible next moves
	// Only winStats, turnNum, and moveString are valid in the returned list of moves
	public ResponseEntity<List<Move>> getCandidateMoves(@RequestParam("previousMovesString") String moveString) {
		// Default is to return top N most common moves with win rate
		// todo: do we want to change this? might want to sort on something like elo
		// todo: add stats for average elo of players for each move?

		List<Move> result = gameService.getCandidateMoves(moveString);
		if (result == null) {
			return ResponseEntity.badRequest().body(null);
		}
		// Sort result by number if games in descending order
		Collections.sort(result, new Comparator<Move>() {
			@Override
			public int compare(Move a, Move b) {
				return b.getWinStats().getNumGames() - a.getWinStats().getNumGames();
			}
		});
		return ResponseEntity.ok().body(result);
	}

	@GetMapping("/")
	// Returns games filtered by some criteria
	// Add more parameters as needed
	public ResponseEntity<List<Game>> getGames(@RequestParam(name = "playerId", required = false) int playerId) {
		List<Game> result = gameService.getGames(playerId);
		if (result == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(result);
	}
	
	@GetMapping("/filtered")
	// Returns games filtered by player name, draw/black/white win
	public ResponseEntity<List<Game>> getGames(
			@RequestParam("playerName") String playerName, 
			@RequestParam("viewBlackWinGames") boolean viewBlackWinGames,
			@RequestParam("viewWhiteWinGames") boolean viewWhiteWinGames,
			@RequestParam("viewDrawGames") boolean viewDrawGames
			) {
		List<Game> result = gameService.getGames(playerName, viewBlackWinGames, viewWhiteWinGames, viewDrawGames);
		if (result == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(result);
	}
	
	@GetMapping("/user")
	// gets all user favourited games
	public ResponseEntity<List<Game>> getUserFavouritedGames(
			@RequestParam("username") String username
			) {
		System.out.println(username);
		List<Game> result = gameService.getUserFavouritedGames(username);
		if (result == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(result);
	}
	
	@DeleteMapping("/user")
	// remove user favourited game
	public void removeUserFavouritedGame(
			@RequestParam("gid") int gid,
			@RequestParam("username") String username
			) {
		System.out.println(username);
		gameService.removeUserFavouritedGame(gid, username);
	}
	
	@PostMapping(path="/user", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	// remove user favourited game
	public ResponseEntity<FavouritedGame> addUserFavouritedGame(@RequestBody FavouritedGame newFavouritedGame) {
		System.out.println(newFavouritedGame.toString());
		FavouritedGame favouritedGame = gameService.addUserFavouritedGame(newFavouritedGame);
		
		if (favouritedGame == null) {
			return ResponseEntity.badRequest().body(null);
	    } else {
	        return new ResponseEntity<>(favouritedGame, HttpStatus.CREATED);
	    }
	}
	
	@GetMapping("/single")
	// Returns games filtered by some criteria
	// Add more parameters as needed
	public ResponseEntity<Game> getGame(@RequestParam(name = "gid", required = false) int gid) {
		Game result = gameService.getGame(gid);
		if (result == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(result);
	}

	@GetMapping("/moves")
	public ResponseEntity<List<Move>> getMoves(@RequestParam(name = "gid") int gid) {
		List<Move> result = gameService.getMoves(gid);
		if (result == null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok().body(result);
	}
}
