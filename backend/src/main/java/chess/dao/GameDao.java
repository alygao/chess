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

import chess.domain.WinStats;


@Repository
public class GameDao {
	
	@Autowired
	private DataSource dataSource;
	
	private static String WIN_STATS_SQL = "SELECT SUM(CASE WHEN winner = 'w' THEN 1 ELSE 0 END) AS numWhiteWins, SUM(CASE WHEN winner = 'b' THEN 1 ELSE 0 END) AS numBlackWins, COUNT(*) AS numGames FROM ( SELECT gid, GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '-') AS moves FROM `Move` GROUP BY gid HAVING moves LIKE ?) GamesWithMove, Game WHERE GamesWithMove.gid = Game.gid";
	private static String GAMES_WITH_OPENING_SQL = "SELECT gid, moves FROM (SELECT gid, GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '-') AS moves FROM `Move` GROUP BY gid HAVING moves LIKE ?) GamesWithOpening";

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
}
