export default (app, api, pool) => {
  app.get('/pair', async (req, res) => {
    const { first, second } = req.query;

    try {
      // Check if the result exists in the database
      const dbResult = await pool.query(
        'SELECT result FROM operations WHERE type = $1 AND first = $2 AND second = $3',
        ['pair', first, second]
      );

      if (dbResult.rows.length > 0) {
        return res.json({ result: dbResult.rows[0].result });
      }

      // If not in the database, use the API
      const pairResult = await api.pair(first, second);

      // Store the result in the database
      await pool.query(
        'INSERT INTO operations (type, first, second, result) VALUES ($1, $2, $3, $4)',
        ['pair', first, second, pairResult]
      );

      res.json(pairResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
