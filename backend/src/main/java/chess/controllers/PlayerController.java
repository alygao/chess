package chess.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chess.domain.Greeting;
import chess.domain.GreetingRequest;
import chess.services.GreetingService;

@RestController
@RequestMapping("/v1/greeting")
@CrossOrigin
public class GreetingController {
	
	@Autowired
	private PlayerService playerService;
	
	@PostMapping("/")
	public List<Greeting> getPlayer(@RequestBody GreetingRequest request) {
		System.out.println("name = " + request.getName() );
		return playerService.savePlayer(request.getName());
	}
}
