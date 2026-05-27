import type { Request, Response } from 'express'
import { UserModel } from './user.model.js'

export async function listUsers(_req: Request, res: Response) {
  try {
    const users = await UserModel.find()
      .select(
        'name email role avatar isVerified isActive createdAt updatedAt'
      )
      .lean()

    return res.json(users)
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch users',
    })
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params

    const user = await UserModel.findById(id)
      .select(
        'name email role avatar isVerified isActive createdAt updatedAt'
      )
      .lean()

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      })
    }

    return res.json(user)
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch user',
    })
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params

    const {
      name,
      avatar,
      isActive,
    } = req.body

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        avatar,
        isActive,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .select(
        'name email role avatar isVerified isActive createdAt updatedAt'
      )
      .lean()

    if (!updatedUser) {
      return res.status(404).json({
        error: 'User not found',
      })
    }

    return res.json(updatedUser)
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to update user',
    })
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params

    const deletedUser = await UserModel.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({
        error: 'User not found',
      })
    }

    return res.json({
      message: 'User deleted successfully',
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to delete user',
    })
  }
}