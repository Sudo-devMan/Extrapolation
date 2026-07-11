
import { Router } from 'express';
import {
  getPapers,
  uploadPaper,
  onePaper,
  editPaper,
  deletePaper,
  getGradeNPapers,
  myPapers
} from '../controllers/papers.controller.js'
import { isAuthenticated } from '../middleware/auth.middleware.js'
import { upload } from '../config/multer.config.js'

const r = Router()

r.get('/', getPapers)
r.get('/:id', onePaper)
r.get('/grade/:grade', getGradeNPapers)
r.get('/my-uploads', myPapers)

r.use(isAuthenticated)
r.delete('/:id', deletePaper)
r.use(upload.array('documents'))
r.post('/', uploadPaper)
r.put('/:id', editPaper)


export default r;
