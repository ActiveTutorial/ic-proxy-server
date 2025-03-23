export default (app, api, pool) => {
  app.get('/check', async (req, res) => {
    const { first, second, result } = req.query;

    try {
      // Check if the result exists in the database
      const dbResult = await pool.query(
        'SELECT result FROM operations WHERE first = $1 AND second = $2 AND result = $3 AND valid IS NOT NULL',
        [first, second, result]
      );

      if (dbResult.rows.length > 0) {
        return res.json({ valid: true });
      }

      // If not in the database, use the API
      const checkResult = await api.check(first, second, result);

      // Store the result in the database
      await pool.query(
        'INSERT INTO operations (first, second, result, valid) VALUES ($1, $2, $3, $4)',
        [first, second, result, checkResult.valid]
      );

      res.json(checkResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
