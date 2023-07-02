import express from 'express'
import { CowController } from './cow.controller'

const router = express.Router()

router.get('/', CowController.getAllCow)
router.post('/add-cow', CowController.addNewCow)
router.get('/:id', CowController.getOneCow)
router.patch('/:id', CowController.updateOneCow)
router.delete('/:id', CowController.deleteOneCow)

export const CowRouter = router
