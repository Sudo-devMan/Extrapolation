import { userRepo } from '../data-source.js'
import { deleteFile, getFileUrl } from '../config/helpers.js'

export const users = async(req, res) => {
  try {
    const userArray = await userRepo.find({ relations: { papers: true } })
    return res.status(200).json({success: true, message: 'Users fetched successfully', users: userArray  })
  } catch (err) {
    console.error(err)
    res.status(500).json({success: false, message: err.message  })
  }
}

export const user = async(req, res) => {
  const { userId } = req.params
  if (!userId) return res.status(400).json({ success: false, message: 'User id is required from the params' })

  try {
    const oneUser = await userRepo.findOne({where: { id: +userId}, relations: { papers: true }})
    if (!oneUser) return res.status(404).json({ success: false, message: `User of id ${userId} does not exist` })

    return res.status(200).json({success: true, message: 'User fetched successfully!', user: oneUser  })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

export const editUser = async(req, res) => {
  let profilePicture = undefined

  const { email, username, bio, userType } = req.body

  try {
    const user = await userRepo.findOneBy({ email: req.user.email })
    if (!user) return res.status(404).json({ success: false, message: 'User does not exist' })

    if (req.file) {
      if (!req.file.mimetype.toLowerCase().includes('image')) {
        return res.status(400).json({success: false, message: 'Profile picture should be a picture!' })
      }

      if (user.profilePicture && !user.profilePicture.includes('default.png')) {
        await deleteFile(user.profilePicture)
      }

      profilePicture = getFileUrl(req.file)
    }

    if (email) { user.email = email }
    if (username) { user.username = username }
    if (profilePicture) { user.profilePicture = profilePicture }
    if (bio) { user.bio = bio }
    if (userType) { user.userType = userType }

    await userRepo.save(user)

    return res.status(200).json({success: true, message: 'User updated successfully!', user })
  } catch (err) {
    console.error(err)
    if (err.message.includes('userType')) {
      err.message = 'User type can be either Teacher or Student and not '.concat(userType)
    }
    res.status(500).json({ success: false, message: err.message })
  }
}

export const deleteUser = async(req, res) => {
  const { email } = req.user

  try {
    const user = await userRepo.findOneBy({ email })
    if (!user) return res.status(404).json({ success: false, message: 'User does not exist' })

    if (user.profilePicture && !user.profilePicture.includes('default.png')) {
      await deleteFile(user.profilePicture)
    }

    const result = await userRepo.delete(user)

    return res.status(200).json({
      success: true,
      message: 'Successfully deleted user with email: '.concat(email),
      result
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}
