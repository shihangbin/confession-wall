import { defineStore } from 'pinia'
import { getArticleItem } from '@/api/home'

interface ILoginState {
  articleData: {
    author_id: number
    content: string
    id: number
    image_urls: string
    publication_date: string
    user: any
  }
}
export const useArticleStore = defineStore('article', {
  state: (): ILoginState => ({
    articleData: {},
  }),
  actions: {
    async getArticleListAction(id: number) {
      const articleResult: any = await getArticleItem(id)
      this.articleData = articleResult.data[0]
    },
  },
})
