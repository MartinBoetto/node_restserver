

const path = require("path");

const uploadFilesToPath = (files, dirpath='')=>{

    return new Promise((resolve, reject) =>{

        const { file } = files;

        uploadPath = path.join(__dirname , '../uploads/',dirpath , file.name);
    
        file.mv(uploadPath, (err) =>{
            if (err) {
                reject (err);
            }
    
            resolve(uploadPath);
        });
    });
   


}

module.exports={
    uploadFilesToPath
}