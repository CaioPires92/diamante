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
      name: 'code',
      title: 'Código',
      type: 'string',
    }),
    defineField({
      name: 'lojaIntegradaId',
      title: 'ID na Loja Integrada (Automático)',
      type: 'string',
    }),
    defineField({
      name: 'size',
      title: 'Tamanho',
      type: 'string',
    }),
    defineField({
      name: 'line',
      title: 'Linha a qual pertence',
      type: 'reference',
      to: [{ type: 'line' }],
    }),
    defineField({
      name: 'catalogSlug',
      title: 'Slug do grupo no catálogo',
      type: 'string',
      description: 'Agrupa sublinhas em páginas maiores, como matizadores e home-care.',
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
    defineField({
      name: 'howToUse',
      title: 'Modo de usar',
      type: 'text',
    }),
    defineField({
      name: 'lineDescription',
      title: 'Descrição da linha',
      type: 'text',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Ordem',
      type: 'number',
    }),
    defineField({
      name: 'source',
      title: 'Fonte da migração',
      type: 'string',
      readOnly: true,
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
