
import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Document',
  tableName: 'documents',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    url: {
      type: 'varchar'
    }
  },
  relations: {
    paper: {
      type: 'many-to-one',
      target: 'Paper',
      joinColumn: true,
      inverseSide: 'documents'
    }
  }
})

