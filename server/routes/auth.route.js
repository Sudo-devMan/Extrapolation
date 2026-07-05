
import { Router } from 'express'
import { signup, login, changePassword } from '../controllers/auth.controller.js'
import { isAuthenticated } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.use(isAuthenticated)
router.post('/change-password', changePassword)

export default router;

