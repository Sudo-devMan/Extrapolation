
import { getRepo } from '../data-source.js'
import User from '../entities/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const userRepo = getRepo(User)
const SALT = Number(process.env.SALT)
const SECRET = process.env.JWT_SECRET
// console.log("Secret: ", SECRET)

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username) return res.status(400).json({ success: false, message: 'Username is required!' });
  if (!email) return res.status(400).json({ success: false, message: 'Email is required!' });
  if (!password) return res.status(400).json({ success: false, message: 'Password is required!' })

  try {
    const emailUser = await userRepo.findOneBy({ email })
    if (emailUser) return res.status(401).json({ success: false, message: 'Email is already in use' })

    const hash = await bcrypt.hash(password, SALT)

    const newUser = userRepo.create({ username, email, password: hash })

    const created = await userRepo.save(newUser)

    return res.status(201).json({ success: true, message: "Successfully created account!", user: created })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }

}

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required!' })
  if (!password) return res.status(400).json({ success: false, message: 'Password is required!' })

  try {
    const user = await userRepo.findOneBy({ email })
    if (!user) return res.status(401).json({ success: false, message: 'User with that email does not exist!' })

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) return res.status(401).json({ success: false, message: 'Wrong password!' })

    const payload = {
      username: user.username,
      email: user.email,
      id: user.id,
      bio: user.bio,
      profilePicture: user.profilePicture
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: '1d' })

    return res.status(200).json({ success: true, message: 'Login successful!', access_token: token, user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

export const changePassword = async (req, res) => {
  const { old, newP } = req.body;
  const { email } = req.user;
  if (!old) return res.status(400).json({ success: false, message: 'Old password is required!' })
  if (!newP) return res.status(400).json({ success: false, message: 'New password is required!' })

  try {
    const user = await userRepo.findOneBy({ email })
    if (!user) return res.status(404).json({ success: false, message: 'User does not exist!' })
    const match = await bcrypt.compare(old, user.password)
    if (!match) return res.status(401).json({ success: false, message: 'Old password does not match current password!' })
    const newHash = await bcrypt.hash(newP, SALT)
    user.password = newHash;
    const result = await userRepo.save(user)
    return res.status(200).json({ success: true, message: 'User password has been updated successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

