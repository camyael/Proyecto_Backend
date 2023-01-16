import {fileURLToPath} from 'url'
import { dirname } from 'path'
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public/images/products")
    },
    filename: (req, file, cb) => {
        file.originalname = file.originalname.split(" ").join("")
        cb(null, Date.now()+"-"+file.originalname)
    }
})

export const uploader = multer({ storage });

export default __dirname;