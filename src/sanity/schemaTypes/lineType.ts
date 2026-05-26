import { defineField, defineType } from 'sanity'

export const lineType = defineType({
  name: 'line',
  title: 'Linha',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da Linha',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
  ],
})
