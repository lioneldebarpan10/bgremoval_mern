import multer from 'multer';

// creating multer middleware for passing form data -> disk storage configuration
const storage = multer.diskStorage({
   filename: function(req , file , callback){
      callback(null , `${Date.now()}_${file.originalname}`)
   }
});

// creating middleware using disk storage

const upload = multer({storage})

export default upload;