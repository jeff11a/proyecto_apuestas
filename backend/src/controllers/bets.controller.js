const betsController = {};

betsController.getBets = (req, res) => res.json({bets: []});

betsController.createBet = (req, res) => res.json({message: 'Bet Saved' });

betsController.getBet = (req, res) => res.json({juego: 'Carl VS Nemp' });

betsController.updateBet = (req, res) => res.json({message: 'Bet Update' });

betsController.deleteBet = (req, res) => res.json({message: 'Bet Delete' });


module.exports = betsController;