import { type SchemaTypeDefinition } from 'sanity'

import { lineType } from './lineType'
import { productType } from './productType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [lineType, productType],
}
