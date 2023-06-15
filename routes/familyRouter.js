const express = require( 'express' );
const router = express.Router();
const upload = require('../utils/multer')
const { createFamily,getAllfamilies, getAFamily,  updatefamily, deletefamily } = require('../controllers/familyController')



router.post( '/profiles', upload.fields( [ { name: "childrensImage", maxCount: 5 } ] ), createFamily )
router.get( '/profiles', getAllfamilies);
router.get( '/profiles/:id', getAFamily );
router.put( '/profiles/:id', upload.fields( [ { name: "childrensImage", maxCount: 1 } ] ), updatefamily );
router.delete( '/profiles/:id', deletefamily );


module.exports = router;