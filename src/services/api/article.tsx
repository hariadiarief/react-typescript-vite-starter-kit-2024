import { AxiosResponse } from 'axios'
import qs from 'qs'

import { API } from './api'

export interface IGetArticleParams {
  'pagination[page]'?: string | number
  'pagination[pageSize]'?: string | number
  'populate[comments][populate][user]'?: string | number
  'populate[user]'?: string | number
  'populate[category]'?: string | number
  'filters[title][$eqi]'?: string | number
  'filters[category][name][$eqi]'?: string | number
  populate?: string | number
}

export interface IPostArticleParam {
  title: string
  description: string
  cover_image_url: string
}

export interface IMetaPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface IArticle {
  id: number
  documentId: string
  title: string
  description: string
  cover_image_url: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface IComment {
  content: string
  createdAt: string
  documentId: string
  id: number
  publishedAt: string
  updatedAt: string
  user: {
    username: string
    email: string
  }
}

export interface IGetArticleResponse {
  data: IArticle & { comments: IComment[] }
  meta: {
    pagination: IMetaPagination
  }
}

export const getArticles = async ({
  pageParam
}: {
  pageParam?: IGetArticleParams
}): Promise<IGetArticleResponse> => {
  const defaultParams = {
    'pagination[page]': 1,
    'pagination[pageSize]': 10
  }

  const queryParams = !pageParam
    ? `?${qs.stringify(defaultParams, { encode: false })}`
    : `?${qs.stringify({ ...defaultParams, ...pageParam }, { encode: false })}`

  return await API.get(`/api/articles${queryParams}`)
}

export const getArticlebyID = async (
  documentId?: string
): Promise<AxiosResponse> => {
  return await API.get(`/api/articles/${documentId}`)
}

export const createArticle = async (
  params: IPostArticleParam
): Promise<AxiosResponse> => {
  return await API.post(`/api/articles`, {
    data: {
      ...params
    }
  })
}

export const editArticle = async ({
  id,
  params
}: {
  id: number | string
  params: IPostArticleParam
}): Promise<AxiosResponse> => {
  return await API.put(`/api/articles/${id}`, {
    data: {
      ...params
    }
  })
}
