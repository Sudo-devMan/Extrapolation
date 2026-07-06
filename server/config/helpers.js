
import { unlink } from 'fs/promises'

export const deleteFile = async(path) => {
  try {
    await unlink(path)
    return true
  } catch (err) {
    console.error(err)
    return err
  }
}

