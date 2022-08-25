const multer = require("multer");

const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || 
      file.mimetype === "image/jpg"|| 
      file.mimetype === "image/jpeg"){
          cb(null, true);
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
  };


module.exports =  multer ({
        storage,
        fileFilter,
})