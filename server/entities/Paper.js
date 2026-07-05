
import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Paper',
  tableName: 'papers',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    title: {
      type: 'text'
    },
    grade: {
      type: 'simple-enum',
      enum: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
    },
    math: {
      type: 'simple-enum', // pure || lit
      enum: ['Pure', 'Lit'],
      default: 'Pure'
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
      onDelete: 'CASCADE',
      inverseSide: 'papers'
    },
    documents: {
      type: 'one-to-many',
      target: 'Document',
      inverseSide: 'paper'
    }
  }
})

