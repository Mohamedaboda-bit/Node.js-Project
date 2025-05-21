import Multer from "multer"
const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + "-" + file.originalname)
  }
})


export const imageUplaod = Multer({ storage: storage })

