export default (app, api) => {
  app.get('/check', async (req, res) => {
    const { first, second, result } = req.query;
    try {
      const checkResult = await api.check(first, second, result);
      res.json(checkResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
