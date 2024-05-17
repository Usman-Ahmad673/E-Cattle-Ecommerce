const express = require('express')
const { createCattle, getCattles, getCattleById, updateCattleById, deleteCattleById, searchCattleByCategory, updateCattleMilk, updateCattle } = require('../controller/cattleController')
const { isAuthenticatedUser } = require('../middleware/Auth')

const router = express.Router()

router.route('/cattle/new').post(createCattle)
router.route('/cattles').get(getCattles)
router.route('/cattle').get(searchCattleByCategory)
router.route('/cattle').put(updateCattle)
router.route('/cattle/:id').get(getCattleById).put(updateCattleById).delete(deleteCattleById)
// router.route('/cattle/new').post(isAuthenticatedUser , createCattle)
// router.route('/cattles').get(isAuthenticatedUser , getCattles)
// router.route('/cattle').get(isAuthenticatedUser , searchCattleByCategory)
// router.route('/cattle').put(isAuthenticatedUser , updateCattleMilk)
// router.route('/cattle/:id').get(isAuthenticatedUser , getCattleById).put(isAuthenticatedUser , updateCattleById).delete(isAuthenticatedUser , deleteCattleById)
module.exports = router