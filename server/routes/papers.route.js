
import { Router } from 'express';
import {
  getPapers,
  uploadPaper,
  onePaper,
  editPaper,
  deletePaper,
  getGradeNPapers,
  myPapers,
  papersFor,
  searchPaper
} from '../controllers/papers.controller.js'
import { isAuthenticated } from '../middleware/auth.middleware.js'
import { upload } from '../config/multer.config.js'

const r = Router();

r.get("/", getPapers);
r.get("/search", searchPaper);
r.get("/grade/:grade", getGradeNPapers);
r.get("/my-uploads", myPapers);
r.get("/for/:id", papersFor);
r.get("/:id", onePaper);

r.use(isAuthenticated);

r.delete("/:id", deletePaper);
r.use(upload.array("documents"));
r.post("/", uploadPaper);
r.put("/:id", editPaper);


export default r;
