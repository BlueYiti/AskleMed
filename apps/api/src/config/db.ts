import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'
import { env } from './env.js'

export const client = new MongoClient(env.MONGODB_URI)

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected')
      return
    }

    await Promise.all([
      mongoose.connect(env.MONGODB_URI, {
        dbName: env.MONGODB_NAME,
      }),

      client.connect(),
    ])

    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export async function disconnectDB() {
  try {
    await Promise.all([
      mongoose.disconnect(),
      client.close(),
    ])

    console.log('MongoDB disconnected')
  } catch (error) {
    console.error('MongoDB disconnect error:', error)
  }
}