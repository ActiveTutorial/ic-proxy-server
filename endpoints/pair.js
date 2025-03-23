export default (app, api, pool) => {
  app.get('/pair', async (req, res) => {
    const { first, second } = req.query;

    try {
      // Check if the result exists in the database
      const dbResult = await pool.query(
        'SELECT result, emoji FROM operations WHERE first = $1 AND second = $2',
        [first, second]
      );

      if (dbResult.rows.length > 0) {
        return res.json({ result: dbResult.rows[0].result, emoji: dbResult.rows[0].emoji, isNew: false });
      }

      // If not in the database, use the API
      const pairResult = await api.pair(first, second);

      res.json(pairResult);

      // Store the result in the database
      await pool.query(
        'INSERT INTO operations (first, second, result, emoji) VALUES ($1, $2, $3, $4)',
        [first, second, pairResult.result, pairResult.emoji]
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
