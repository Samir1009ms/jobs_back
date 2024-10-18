const express   = require('express');
const router    = express.Router();

const {getBankCard,addBankCard,updateBankCard,deleteBankCard,getCard,cardDetails,blockCard} = require('../controllers/bankcards.js');

router.get('/getBankCards/:userId',getBankCard);
router.get('/getBankCard/',getCard);
router.get('/getCardDetails/:id',cardDetails)
router.post('/addBankCard/:userId',addBankCard);
router.put('/updateBankCard/:userId/cars/:cardId',updateBankCard);
router.put('/blockCard/:userId/card/:cardId',blockCard);
// router.delete('/deleteBankCard/:userId/delete/:bankCardId',deleteBankCard);

module.exports = router;