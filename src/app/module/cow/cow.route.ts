import express from 'express'
import { CowController } from './cow.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/role.enum'

const router = express.Router()

router.get(
  '/',
  auth.authorization(USER_ROLE.ADMIN, USER_ROLE.SELLER, USER_ROLE.BUYER),
  CowController.getAllCow
)
router.post('/', auth.authorization(USER_ROLE.SELLER), CowController.addNewCow)
router.get(
  '/:id',
  auth.authorization(USER_ROLE.ADMIN, USER_ROLE.SELLER, USER_ROLE.BUYER),
  CowController.getOneCow
)
router.patch(
  '/:id',
  auth.authorization(USER_ROLE.SELLER),
  CowController.updateOneCow
)
router.delete(
  '/:id',
  auth.authorization(USER_ROLE.SELLER),
  CowController.deleteOneCow
)

export const CowRoute = router
