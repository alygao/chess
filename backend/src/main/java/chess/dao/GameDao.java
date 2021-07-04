package chess.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import chess.domain.Game;
import chess.domain.Move;
import chess.domain.Player;
import chess.domain.WinStats;


@Repository
public class GameDao {
	
	@Autowired
	private DataSource dataSource;
	
	private static String WIN_STATS_SQL = "SELECT SUM(CASE WHEN winner = 'w' THEN 1 ELSE 0 END) AS numWhiteWins, SUM(CASE WHEN winner = 'b' THEN 1 ELSE 0 END) AS numBlackWins, COUNT(*) AS numGames FROM ( SELECT gid, GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '-') AS moves FROM `Move` GROUP BY gid HAVING moves LIKE ?) GamesWithMove, Game WHERE GamesWithMove.gid = Game.gid";
	private static String GAMES_WITH_OPENING_SQL = "SELECT gid, moves FROM (SELECT gid, GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '-') AS moves FROM `Move` GROUP BY gid HAVING moves LIKE ?) GamesWithOpening";
	private static String GAME_WITH_PLAYER_SELECT_SQL = "SELECT g.gid, winner, `date`, pi1.pid AS pid1, pi2.pid AS pid2, pi1.elo AS elo1, pi2.elo AS elo2, pi1.isWHite AS p1IsWhite, p1.name as p1name, p2.name as p2name, p1.username as p1username, p2.username as p2username FROM Game g INNER JOIN PlayedIn pi1 ON g.gid = pi1.gid AND pi1.pid = ? INNER JOIN PlayedIn pi2 ON g.gid = pi2.gid AND pi2.pid != ? INNER JOIN Player p1 ON pi1.pid = p1.pid INNER JOIN Player p2 ON pi2.pid = p2.pid";
	private static String GAME_WITH_PLAYER_NAME_SELECT_SQL = "SELECT DISTINCT g.gid, g.winner, g.date, g.eid FROM Game g INNER JOIN PlayedIn pi ON g.gid = pi.gid INNER JOIN Player p ON pi.pid = p.pid WHERE name LIKE ?";
	private static String PLAYERS_IN_GAME_SELECT_SQL = "SELECT p.pid, p.name, p.username, pi.elo, pi.isWhite FROM Player p INNER JOIN PlayedIn pi ON p.pid = pi.pid WHERE pi.gid = ?";
	private static String MOVES_IN_GAME_SQL = "SELECT * FROM Move WHERE gid = ?";

	public WinStats getWinStats(String moveString) {
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(WIN_STATS_SQL)){
			WinStats stats = new WinStats();
			statement.setString(1, moveString + "%");
			ResultSet rs = statement.executeQuery();
			if (rs.next()) {
				stats.setNumWhiteWins(rs.getInt("numWhiteWins"));
				stats.setNumBlackWins(rs.getInt("numBlackWins"));
				stats.setNumGames(rs.getInt("numGames"));
			}
			return stats;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public Set<String> getCandidateMoves(String moveString) {
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(GAMES_WITH_OPENING_SQL)){
			statement.setString(1, moveString + "%");
			ResultSet rs = statement.executeQuery();
			int moveStartIdx = moveString.length() + 1;
			Set<String> result = new HashSet<>();
			while (rs.next()) {
				String s = rs.getString("moves");
				int moveEndIdx = s.indexOf("-", moveStartIdx);
				if (moveEndIdx == -1) {
					moveEndIdx = s.length();
				}
				if (moveEndIdx > moveStartIdx) {
					String nextMove = s.substring(0, moveEndIdx);
					result.add(nextMove);
				}
				// System.out.println(moveStartIdx);
				// System.out.println(moveEndIdx);
				// System.out.println(result);
			}
			return result;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<Game> getGames(int pid) {
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(GAME_WITH_PLAYER_SELECT_SQL)){
			statement.setInt(1, pid);
			statement.setInt(2, pid);
			ResultSet rs = statement.executeQuery();
			List<Game> result = new ArrayList<>();
			while (rs.next()) {
				Game g = new Game();
				Player p1 = new Player();
				Player p2 = new Player();
				g.setGid(rs.getInt("gid"));
				g.setWinner(rs.getString("winner").charAt(0));
				g.setDate(rs.getString("date"));
				p1.setId(rs.getInt("pid1"));
				p1.setElo(rs.getInt("elo1"));
				p1.setName(rs.getString("p1name"));
				p1.setUsername(rs.getString("p1username"));
				p2.setId(rs.getInt("pid2"));
				p2.setElo(rs.getInt("elo2"));
				p2.setName(rs.getString("p2name"));
				p2.setUsername(rs.getString("p2username"));
				if (rs.getBoolean("p1IsWhite")){
					g.setWhite(p1);
					g.setBlack(p2);
				} else {
					g.setWhite(p2);
					g.setBlack(p1);
				}
				result.add(g);
			}
			return result;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;

	}

	
	public List<Game> getGames(String playerName, boolean viewBlackWinGames, boolean viewWhiteWinGames, boolean viewDrawGames) {
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
			statement.setString(1, "%" + playerName + "%");
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

	public List<Move> getMoves(int gid) {
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(MOVES_IN_GAME_SQL)){
			statement.setInt(1, gid);
			ResultSet rs = statement.executeQuery();
			List<Move> result = new ArrayList<>();
			while (rs.next()) {
				Move m = new Move();
				m.setGid(gid);
				m.setAnotation(rs.getString("annotation"));
				m.setChessPiece(rs.getString("chessPiece"));
				m.setTurnNum(rs.getInt("turnNum"));
				m.setFromSquare(rs.getString("fromSquare"));
				m.setToSquare(rs.getString("toSquare"));
				result.add(m);
			}
			return result;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
}
