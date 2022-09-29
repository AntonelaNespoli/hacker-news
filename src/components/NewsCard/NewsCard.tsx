import cn from "classnames";
import { ReactComponent as ClockIcon } from "../../assets/icon-time.svg";
import { News } from "../../Types/News";
import "./NewsCard.styles.css";

export const NewsCard = ({ item, toggleFavesNews: toggleFavNews }: { item: News, toggleFavesNews: Function }) => {
    
  const targetBlank = (url: string) => {
    return window.open(url, "blank");
  };
 
  return (
    <div className="news-card-container">
      <div className="news-card-body" onClick={() => targetBlank(item.url)}>
        <div className="news-card-date">
          <ClockIcon />
          <span>{`${item.date.toString()} by @${item.author}`}</span>
        </div>
        <div className="news-card-title">
          <span>{item.title}</span>
        </div>
      </div>
      <div className="news-card-fav-container" onClick={() => toggleFavNews(item)}>
        <div
          className={cn({
            "news-card-fav-icon": true,
            "news-card-fav-icon-fill": item.isFav,
          })}
        ></div>
      </div>
    </div>
  );
};
