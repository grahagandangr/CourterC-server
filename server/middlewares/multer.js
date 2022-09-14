const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]
    );
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
