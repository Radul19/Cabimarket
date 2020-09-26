const {Router} = require('express')
const router = Router()

//Functions from...
const {renderIndex,newMark,sendMarks,deleteMark,findPlace,renderStallPage} = require('../controllers/index.controller')

router.get('/',renderIndex)
router.get('/stallPage/:stall_id',renderStallPage)

router.post('/newLoc/:lat/:lng/:mtype/:place',newMark)
router.post('/deleteLoc/:lat/:lng',deleteMark)
router.post('/knowMarks',sendMarks)

router.post('/findPlace/:place',findPlace)

module.exports = router