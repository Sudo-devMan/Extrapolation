
import { Router } from 'express'
import { upload } from '../config/multer.config.js'
import { users, user, editUser, deleteUser } from '../controllers/users.controller.js'
import { isAuthenticated } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', users)
router.get('/:userId', user)
router.use(isAuthenticated, upload.single('profilePicture'))
router.route('/').put(editUser).delete(deleteUser)

export default router;

