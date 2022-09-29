//import { ICard } from "../interfaces/ICard";
import API from "./config";
import { NEWS_ENDPOINTS } from "./endpoints";
import { News } from "../Types/News";

const NewsService = {
  getNews: (pageNumber: number, technology: string): any =>
    API.get(
      `${NEWS_ENDPOINTS.SEARCH_BY_DATE}&query=${technology}&page=${pageNumber}`
    )
      .then((res) => {
        let news: News[] = [];
        res.data.hits.forEach((item: any) => {
          let newItem: News = {
            author: item.author,
            date: new Date(item.created_at),
            id: item.objectID,
            isFav: false,
            url: item.story_url,
            title: item.story_title ?? item.title,
          };
          news.push(newItem);
        });
        return news;
      })
      .catch((err) => {
        return err;
      }),
};

export default NewsService;
