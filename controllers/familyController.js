const express = require( 'express' );
const familyModel = require("../models/familyModel")

// create a family

const createFamily = async(req, res) => {
    const { fathersName, mothersName, childrensName } = req.body;
    const filenames= req.files["childrensImage"].map((file) => file.filename)
    
    const familyProfile = new familyModel ({
        fathersName,
        mothersName,
        childrensName,
        childrensImage: filenames,
    });
  
    try {
      const createdFamily = await familyProfile.save();
      if(!createdFamily) {
      res.status(400).json({ message: 'Family not created successfully' });
      }else{
        res.status(201).json({ message: 'Family created successfully', family: createdFamily });
    }
    } catch (error) {
      res.status(500).json({ message: 'Failed to create family', error: error.message });
    }
  };

  // get all families
const getAllfamilies = async ( req, res ) => {
    try {
        const families = await familyModel.find();
        if ( families.length === 0 ) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                message: "families",
                data: families,
                totalfamilies:families.length
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// get a family
const getAFamily = async ( req, res ) => {
    const familyId = req.params.id;
    const family = await familyModel.findById( familyId );
    try {
        if ( !family) {
            res.status( 404 ).json( {
                message: "Nofamilyfound."
            })
        } else {
            res.status( 200 ).json( {
                data: family,
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
    })
}
}

// updating profile
const updatefamily = async ( req, res ) => {
    const familyId = req.params.id;
    const family = await familyModel.findById( familyId );
    try {
        const {fathersName, mothersName, childrensName} = req.body;
        const bodyData = {
            fathersName: fathersName || family.fathersName,
            mothersName: mothersName || family.mothersName,
            childrensName: childrensName || family.childrensName,
            childrensImage:family.childrensImage
        }

        if ( req.files && req.files[ "childrensImage" ] ) {
            const oldChildrensImagePath = `uploads/${ family.childrensImage}`
            if ( fs.existsSync( oldChildrensImagePath ) ) {
                fs.unlinkSync(oldChildrensImagePath)
            }
            bodyData.childrensImage = req.files.childrensImage[ 0 ].filename;
        }
        const newChildrensImage = await familyModel.findByIdAndUpdate( familyId, bodyData, { new: true } )
            if ( newChildrensImage  ) {
                res.status( 200 ).json( {
                    message: "Updated successfully.",
                    data: newProfileImage
                })
            } else {
                res.status( 404 ).json( {
                    message: "Not found"
                })
            }
    } catch ( e ) { 
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// remove a profile
const deletefamily = async ( req, res ) => {
    const familyId = req.params.id;
    const family = await familyModel.findById( familyId );
    try {
            constoldChildrensImagePath = `uploads/${ family.childrensImageImage }`
            if ( fs.existsSync( oldChildrensImagePath ) ) {
                fs.unlinkSync( oldChildrensImagePath )
            }
        const deletedfamily = await familyModel.findByIdAndDelete( familyId );
        if ( deletedfamily ) {
            res.status( 200 ).json( {
                message: "Deleted successfully"
            })
        } else {
            res.status( 404 ).json( {
                message: "Your problem is bigger than our own"
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}
  module.exports = {
    createFamily,
    getAllfamilies,
    getAFamily,
    updatefamily,
    deletefamily
  }
    

