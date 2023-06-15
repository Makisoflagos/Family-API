const mongoose = require( 'mongoose' );

const familySchema = new mongoose.Schema( {
    fathersName: {
        type: String,
        require: true
    },
   mothersName: {
        type: String,
        required: true
    },
    childrensName: [{
        type: String,
        required: true
    }],
    childrensImage: [{
        type: String,
        required: true
    }]
}, { timestamps: true } );

const familyModel = mongoose.model( "familyprofile", familySchema);

module.exports = familyModel