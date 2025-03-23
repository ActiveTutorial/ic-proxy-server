export default (app, api, pool) => {
  app.get('/check', async (req, res) => {
    const { first, second, result } = req.query;

    try {
      // Check if the result exists in the database
      const dbResult = await pool.query(
        'SELECT result FROM operations WHERE type = $1 AND first = $2 AND second = $3 AND result = $4',
        ['check', first, second, result]
      );

      if (dbResult.rows.length > 0) {
        return res.json({ valid: true });
      }

      // If not in the database, use the API
      const checkResult = await api.check(first, second, result);

      // Store the result in the database
      await pool.query(
        'INSERT INTO operations (type, first, second, result, valid) VALUES ($1, $2, $3, $4, $5)',
        ['check', first, second, result, checkResult.valid]
      );

      res.json(checkResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
