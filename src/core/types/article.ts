import { profileCodec } from '@/core/types/profile'
import { tagCodec } from '@/core/types/tag'
import { withMessage } from 'io-ts-types'
import { slugCodec, dateCodec, positiveCodec } from '@/core/types/scalar'
import * as t from 'io-ts'

const articleCodecRequired = t.type({
  slug: slugCodec,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: t.array(t.string),
  createdAt: dateCodec,
  updatedAt: dateCodec,
  favorited: t.boolean,
  favoritesCount: positiveCodec,
})

const articleCodecOptional = t.partial({
  author: profileCodec,
})

export const articleCodec = t.intersection([
  articleCodecRequired,
  articleCodecOptional,
])

export type Article = t.TypeOf<typeof articleCodec>
export type ArticleOutput = t.OutputOf<typeof articleCodec>

export const articlesCodec = t.type({
  articles: t.array(articleCodec),
  articlesCount: positiveCodec,
})

export type Articles = t.TypeOf<typeof articlesCodec>

const createArticleCodecRequired = t.type({
  title: withMessage(t.string, () => 'Invalid title'),
  description: withMessage(t.string, () => 'Invalid description'),
  body: withMessage(t.string, () => 'Invalid body'),
})

const createArticleCodecOptional = t.partial({
  tagList: t.array(tagCodec),
})

export const createArticleCodec = t.intersection([
  createArticleCodecRequired,
  createArticleCodecOptional,
])

export type CreateArticle = t.TypeOf<typeof createArticleCodec>
