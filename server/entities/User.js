
import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    username: {
      type: 'text'
    },
    email: {
      type: 'text',
      unique: 'true'
    },
    password: {
      type: 'text'
    },
    profilePicture: {
      type: 'text',
      default: 'please add a url'
    },
    bio: {
      type: 'text',
      default: 'I do not have a bio'
    },
    userType: {
      type: 'simple-enum', // student || teacher
      enum: ['Student', 'Teacher'],
      default: 'Student'
    }
  },
  relations: {
    papers: {
      type: 'one-to-many',
      target: 'Paper',
      inverseSide: 'user'
    }
  }
})

