
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uName = `${String(Date.now()).slice(String(Date.now()).length - 3)}-${file.originalname}`
    cb(null, uName)
  }
})

export const upload = multer({ storage: storage })

