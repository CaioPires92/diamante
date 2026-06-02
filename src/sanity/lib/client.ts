import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Alterado para false para garantir dados em tempo real após a migração
  token: process.env.SANITY_API_TOKEN, // Adicionado para permitir leitura autenticada no servidor (Server Components)
})
