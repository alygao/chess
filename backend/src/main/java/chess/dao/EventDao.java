package chess.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import chess.domain.Event;

@Repository
public class EventDao {
	
	@Autowired
	private DataSource dataSource;
	
	private static String SELECT_SQL = "SELECT eid, name FROM EVENT";
	private static String GAME_WITH_PLAYER_NAME_SELECT_SQL = "SELECT DISTINCT g.gid, g.winner, g.date, g.eid FROM Game g INNER JOIN PlayedIn pi ON g.gid = pi.gid INNER JOIN Player p ON pi.pid = p.pid WHERE g.eid = ?";;

	public List<Event> getEvents(String name) {
		List<Event> events = new ArrayList<>();
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(SELECT_SQL)){
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				events.add(new Event(
						rs.getInt("eid"),
						rs.getString("name")
						));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return events;
	}

	public List<Game> getGames(int eid, boolean viewBlackWinGames, boolean viewWhiteWinGames, boolean viewDrawGames) {
		String winnerConditions = "";
		if (viewBlackWinGames) {
			winnerConditions = winnerConditions + "g.winner='b'";
		}
		if (viewWhiteWinGames) {
			if (winnerConditions.length() > 0) {
				winnerConditions = winnerConditions + " OR ";
			}
			winnerConditions = winnerConditions + "g.winner='w'";
		}
		if (viewDrawGames) {
			if (winnerConditions.length() > 0) {
				winnerConditions = winnerConditions + " OR ";
			}
			winnerConditions = winnerConditions + "g.winner='t'";
		}
		
		String SQL_STRING = GAME_WITH_PLAYER_NAME_SELECT_SQL;
		if (winnerConditions.length() > 0) {
			SQL_STRING = SQL_STRING + " AND (" + winnerConditions + ")";
		}
		
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(SQL_STRING)){
			statement.setInt(1, eid);
			ResultSet rs = statement.executeQuery();
			List<Game> result = new ArrayList<>();
			while (rs.next()) {
				
				Game g = new Game(
						rs.getInt("gid"),
						rs.getString("winner").charAt(0),
						rs.getString("date"),
						rs.getInt("eid")
						);
				System.out.println("GAME = " + g.toString());
				PreparedStatement statement2 = conn.prepareStatement(PLAYERS_IN_GAME_SELECT_SQL);
				statement2.setInt(1, rs.getInt("gid"));
				ResultSet rs2 = statement2.executeQuery();
				rs2.next();
				Player p1 = new Player(rs2.getInt("pid"), rs2.getString("name"), rs2.getString("username"), rs2.getInt("elo"));
				if (rs2.getBoolean("isWhite")){
					g.setWhite(p1);
					
				}
				rs2.next();
				Player p2 = new Player(rs2.getInt("pid"), rs2.getString("name"), rs2.getString("username"), rs2.getInt("elo"));
				if (rs2.getBoolean("isWhite")){
					g.setWhite(p2);
					g.setBlack(p1);
				} else {
					g.setBlack(p2);
				}
				
				result.add(g);
			}
			return result;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
}
