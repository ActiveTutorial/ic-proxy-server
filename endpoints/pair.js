export default (app, api) => {
  app.get('/pair', async (req, res) => {
    const { first, second } = req.query;
    try {
      const pairResult = await api.pair(first, second);
      res.json(pairResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
