
import { Router } from 'express';
import {
  getPapers,
  uploadPaper,
  onePaper,
  editPaper,
  deletePaper
} from '../controllers/papers.controller.js'

const r = Router()

r.route('/')
  .get(getPapers)
  .post(uploadPaper)

r.route('/:id')
  .get(onePaper)
  .put(editPaper)
  .delete(deletePaper)

export default r;
