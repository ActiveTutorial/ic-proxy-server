export default (app, api, pool) => {
  app.get('/pair', async (req, res) => {
    const { first, second } = req.query;

    try {
      // Check if the result exists in the database
      const dbResult = await pool.query(
        'SELECT result FROM operations WHERE first = $1 AND second = $2 AND valid IS NULL',
        [first, second]
      );

      if (dbResult.rows.length > 0) {
        return res.json({ result: dbResult.rows[0].result });
      }

      // If not in the database, use the API
      const pairResult = await api.pair(first, second);

      // Store the result in the database
      await pool.query(
        'INSERT INTO operations (first, second, result, valid) VALUES ($1, $2, $3, NULL)',
        [first, second, pairResult]
      );

      res.json(pairResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
