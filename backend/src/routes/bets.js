const { Router } = require('express');
const router = Router();

const { getBets, createBet, getBet, updateBet, deleteBet } = require('../controllers/bets.controller');

router.route('/')
    .get( getBets )
    .post( createBet );
    
router.route('/:id')
    .get( getBet )
    .put( updateBet )
    .delete( deleteBet );

module.exports = router;