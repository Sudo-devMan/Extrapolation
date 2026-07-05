
export const getPapers = async(req, res) => {
  res.json({message: 'all papers'})
}

export const onePaper = async(req, res) => {
  res.json({message: 'one paper returned'})
}

export const editPaper = async(req, res) => {
  res.json({message: 'edit a paper'})
}

export const uploadPaper = async(req, res) => {
  res.json({message: 'upoad a paper'})
}

export const deletePaper = async(req, res) => {
  res.json({message: 'delete a paper'})
}
