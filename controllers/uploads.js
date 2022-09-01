const { response } = require("express");
const path = require("path");
const {uploadFilesToPath} = require('../helpers/upload-file')



const uploadFiles = async (req, res = response)  =>{

    console.log('req.files >>>', req.files);   
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({msg:'No files were uploaded.'});
        return;
    }

    
    console.log('req.files >>>', req.files); // eslint-disable-line

    try{    
        const pathUploadFile=  await uploadFilesToPath(req.files,"prueba");
        res.json({
            path:pathUploadFile
        });
    }catch(msg){
        res.status(400).json({msg});
    }

}


module.exports ={
    uploadFiles
}