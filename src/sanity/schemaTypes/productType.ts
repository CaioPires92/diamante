import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Produto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome do Produto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Preço (Ex: R$ 89,90)',
      type: 'string',
    }),
    defineField({
      name: 'line',
      title: 'Linha a qual pertence',
      type: 'reference',
      to: [{ type: 'line' }],
    }),
    defineField({
      name: 'image',
      title: 'Imagem do Produto',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Descrição Curta',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'image',
    },
  },
})
