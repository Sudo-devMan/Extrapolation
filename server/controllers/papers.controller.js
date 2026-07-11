
import { paperRepo, docRepo, userRepo } from '../data-source.js'
import { fileURLToPath } from 'url'
import * as path from 'path'
import { deleteFile } from '../config/helpers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const getPapers = async (req, res) => {
  try {
    const papers = await paperRepo.find({ relations: { documents: true, user: true } })
    return res.status(200).json({ success: true, message: 'Papers fetched successfully', uploads: papers })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

export const getGradeNPapers = async (req, res) => {
  try {
    const { grade } = req.params;
    if (!grade) return res.status(400).json({ success: false, message: 'Please provide a grade in the url params' })
    const paper = await paperRepo.find({ where: { grade: `Grade ${grade}` }, relations: { documents: true, user: true } })
    return res.status(200).json({ success: true, message: 'Papers fetched successfully', uploads: paper })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

export const myPapers = async (req, res) => {
  const { id } = req.user
  if (!id) return res.status(401).json({ success: false, message: 'User is not logged in' })
  try {
    const my = await paperRepo.find({ where: { user: { id } } })
    return res.status(200).json({ success: false, message: 'Uploads fetched successfully', uploads: my })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false4, message: err.message })
  }
}

export const onePaper = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ success: false, message: 'Id is required to lookup a paper' })

  try {
    const paper = await paperRepo.findOne({ where: { id: +id }, relations: { documents: true, user: true } })
    if (!paper) return res.status(404).json({ success: false, message: `Paper with id ${id} was not found` })
    return res.status(200).json({ success: true, message: 'Paper fetched successfully', upload: paper })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

export const uploadPaper = async (req, res) => {
  const { title, grade, math } = req.body;
  const { email } = req.user;

  //console.log("Request files: ",req.files)

  if (req.files.length === 0) return res.status(400).json({ success: false, message: 'Please provide documents to upload' })
  if (!title) return res.status(400).json({ success: false, message: 'Upload title is required' })
  if (!grade) return res.status(400).json({ success: false, message: 'Upload grade is required' })
  if (!math) return res.status(400).json({ success: false, message: 'Upload Math type is required' })

  const documents = req.files.map(file => {
    return `http://127.0.0.1:4000/${file.filename}`
  })

  //console.log("Documents: ",documents)

  try {
    const user = await userRepo.findOneBy({ email })
    if (!user) return res.status(404).json({ success: false, message: 'User does not exist' })
    user.password = 'no password for you to hack :)'

    const paper = paperRepo.create({ title, grade, math, user })
    const saved = await paperRepo.save(paper)

    const documentEntities = documents.map(doc => docRepo.create({ url: doc, paper: saved }))
    await docRepo.save(documentEntities)

    const completePaper = await paperRepo.findOne({ where: { id: saved.id }, relations: { user: true, documents: true } })

    return res.status(201).json({ success: true, message: 'Uploaded successfully', upload: completePaper })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

export const editPaper = async (req, res) => {
  const { email } = req.user;
  const { title, grade, math, toDelete } = req.body;
  const { id } = req.params
  let newDocuments = []
  let docsToDelete = toDelete

  if (typeof docsToDelete === 'string') {
    docsToDelete = [docsToDelete]
  }

  if (!id) return res.status(400).json({ success: false, message: 'Upload id was not provided' })

  try {
    const user = await userRepo.findOneBy({ email })
    //console.log("User:", user)
    //console.log("Request user: ", req.user)
    if (!user) return res.status(404).json({ success: false, message: 'User was not found' })

    const paper = await paperRepo.findOne({ where: { id: +id }, relations: { user: true, documents: true } })
    if (!paper) return res.status(404).json({ success: false, message: `Upload ${id} was not found` })

    if (paper.user.id !== user.id) return res.status(403).json({ success: false, message: 'You do not have permission to edit this paper' });

    if (title) { paper.title = title }
    if (grade) { paper.grade = grade }
    if (math) { paper.math = math }

    if (docsToDelete && docsToDelete.length !== 0) {
      //console.log("To delete: ", docsToDelete)
      const paths = docsToDelete.map(t => {
        const filename = path.basename(t)
        return path.resolve(__dirname, '../uploads/', filename)
      })
      //console.log("Paths: ", paths)
      for (let i = 0; i < paths.length; i++) {
        deleteFile(paths[i])
      }
      paper.documents = paper.documents.filter(p => {
        return !docsToDelete.includes(p.url)
      })
    }

    if (req.files) {
      newDocuments = req.files
      //console.log("New docs: ", newDocuments)
      for (let i = 0; i < newDocuments.length; i++) {
        //console.log("Add paper")
        paper.documents.push({
          url: `http://127.0.0.1:4000/${newDocuments[i].filename}`
        })
      }
      //console.log("New in paper: ",paper.documents)
    }

    const edited = await paperRepo.save(paper)

    return res.status(200).json({ success: true, message: 'Upload was edited successfully', upload: edited })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}


// please test this because I did not havce time to test it as I was going to do something
// with the hard drive of my other pc. ciao
// alright it was tested and It is looking good
export const deletePaper = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params
  try {
    const user = await userRepo.findOneBy({ email })
    if (!user) return res.status(404).json({ success: true, message: 'User not found' })

    const paper = await paperRepo.findOneBy({ id: +id })
    if (!paper) return res.status(404).json({ success: false, message: `Upload with id ${id} was not found` })

    if (user.id !== paper.user.id) return res.status(403).json({ success: false, message: 'You do not have the permission to delete this upload!' })

    const result = await paperRepo.delete(paper)

    if (result.affected === 0) return res.status(200).json({ success: false, message: 'Nothing to delete' })

    return res.status(200).json({ success: true, message: `Successfully deleted upload!`, result })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}
