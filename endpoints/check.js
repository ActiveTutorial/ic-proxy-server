export default (app, api, pool) => {
  app.get('/check', async (req, res) => {
    const { first, second, result } = req.query;

    try {
      // Check if the result exists in the database
      const dbResult = await pool.query(
        'SELECT result, emoji FROM operations WHERE first = $1 AND second = $2 AND result = $3',
        [first, second, result]
      );

      if (dbResult.rows.length > 0) {
        const dbResultRow = dbResult.rows[0];
        if (dbResultRow.result === result) {
          return res.json({ valid: true, emoji: dbResultRow.emoji });
        } else {
          return res.json({ valid: false, emoji: "" });
        }
      }

      // If not in the database, use the API
      const checkResult = await api.check(first, second, result);

      res.json(checkResult);

      if (checkResult.valid) {
        // Store the result in the database
        await pool.query(
          'INSERT INTO operations (first, second, result, emoji) VALUES ($1, $2, $3, $4)',
          [first, second, result, checkResult.emoji]
        );
      }

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
