const multer = require( 'multer' );

const familyStorage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb( null, './uploads' );
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
} );


const fileFilter = (req, file, cb) => {
    if ( file.mimetype.startsWith( "image/" ) ) {
        cb(null, true)
    } else {
        cb(new Error("Only image is supported"), false)
    }
}




const upload = multer({
    storage: familyStorage,
    fileFilter: fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 20,
    }
})

module.exports = upload;