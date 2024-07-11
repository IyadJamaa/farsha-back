

const multer = require('multer');
const diskStorage = multer.diskStorage;

 const filterObject = {
  image: ["image/png", "image/jpg", "image/jpeg"],
  pdf: ["application/pdf"],
};



 const fileUpload = (filter) => {
    
  const fileFilter = (req, file, cb) => {
    if (!filter.includes(file.mimetype))
      return cb(new Error("invalid file format!"), false);
    return cb(null, true);
  };
  return multer({ storage: diskStorage({}), fileFilter });
};

module.exports = { filterObject, fileUpload };