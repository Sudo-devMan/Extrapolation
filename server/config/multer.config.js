
import multer from 'multer'
import multerS3 from 'multer-s3'
import { s3 } from './s3.js'

const isProduction = process.env.NODE_ENV === 'production'
let storage;

if (isProduction) {
  storage = multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    Key(req, file, cb) {
      const uName = `${String(Date.now()).slice(String(Date.now()).length - 3)}-${file.originalname.replace(/\s+/g, '_')}`
      cb(null, uName)
    }
  })
} else {
  storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uName = `${String(Date.now()).slice(String(Date.now()).length - 3)}-${file.originalname.replace(/\s+/g, '_')}`
    cb(null, uName)
  }
})
}
export const upload = multer({ storage: storage })

