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

import chess.domain.WinStats;


@Repository
public class GameDao {
	
	@Autowired
	private DataSource dataSource;
	
	private static String WIN_STATS_SQL = "SELECT SUM(CASE WHEN winner = 'w' THEN 1 ELSE 0 END) AS numWhiteWins, SUM(CASE WHEN winner = 'b' THEN 1 ELSE 0 END) AS numBlackWins, COUNT(*) AS numGames FROM ( SELECT gid, GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '') AS moves FROM `Move` GROUP BY gid HAVING moves LIKE ?) GamesWithMove, Game WHERE GamesWithMove.gid = Game.gid";

	public WinStats getWinStats(String moveString) {
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(WIN_STATS_SQL)){
			WinStats stats = new WinStats();
			System.out.println(statement);
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
}
