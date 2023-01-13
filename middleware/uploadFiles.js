import multer from 'multer';
import path from 'path';
import { idGenerator } from '../helpers/token.js';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads')
    },
    filename: function(req, file, callback) {
        callback(null, idGenerator() + path.extname(file.originalname))
    }
});

const upload = multer({ storage });

export default upload