import { Pagination } from "@mui/material";
import cn from "classnames";
import { useEffect, useState } from "react";
import { TECH_ARR_FILTER } from "../../helpers/const/Techs";
import { getLocalData, setLocalData } from "../../helpers/LocalStorage";
import { News } from "../../Types/News";
import { Tech } from "../../Types/Tech";
import { FavesFilter } from "../FavesFilter/FavesFilter";
import { NewsCard } from "../NewsCard/NewsCard";
import { SelectFilter } from "../SelectFilter/SelectFilter";
import NewsService from "../../services/NewsService";
import "./Body.styles.css";

export const Body = () => {
  const initPageNumber: number = getLocalData("pageNumber");
  const initTechFilterApply: Tech = getLocalData("techFilterApply");
  const [news, setNews]: [News[], Function] = useState([]);
  const [favesNews, setFavesNews]: [News[], Function] = useState( getLocalData("favNews"));
  const [pageNumber, setPageNumber]: [number, Function] = useState( Number(initPageNumber));
  const [techFilterApply, setTechFilterApply]: [Tech, Function] = useState(
    initTechFilterApply.name !== undefined
      ? initTechFilterApply
      : TECH_ARR_FILTER[0]
  );
  const [showFaves, setShowFaves]: [boolean, Function] = useState(false);
  const isMobile = window.matchMedia("(max-width: 767px)").matches; 
  useEffect(() => {
    setLocalData("pageNumber", pageNumber, setPageNumber);
    setLocalData("techFilterApply", techFilterApply, setTechFilterApply);
  }, []);

  const fetchData = async () => {
    const dataNews = await NewsService.getNews(pageNumber, techFilterApply.key);
    const newsChecked = checkIsFavNews(dataNews);
    setNews(newsChecked);
  };

  const checkIsFavNews = (dataNews: News[]): News[] => {
    dataNews.forEach((dataItem) => {
      dataItem.isFav =
        favesNews.find((favItem) => dataItem.id === favItem.id) !== undefined;
    });
    return dataNews;
  };
 
  useEffect(() => {
    fetchData();
  }, [pageNumber, techFilterApply]);

  useEffect(() => {
    news.forEach((newsItem) => {
      const index = favesNews.findIndex((favItem) => favItem.id === newsItem.id);
      const exists = index !== -1;
      if (exists && !newsItem.isFav) {
        favesNews.splice(index, 1);
      } else if (!exists && newsItem.isFav) {
        favesNews.push(newsItem);
      }
    });
    setLocalData("favNews", favesNews, setFavesNews);
  }, [news, favesNews]);

  const toggleShowFaves = (show: boolean) => {
    setNews([]);
    if(show){
      setNews(favesNews);
    }else{
      fetchData();
    }
    setShowFaves(show);
  }

  const applyTechFilter = (filterKey: string) => {
    const newFilter: Tech = TECH_ARR_FILTER.filter(
      (x) => x.key === filterKey
    )[0];
    setTechFilterApply(newFilter);
    setLocalData("techFilterApply", newFilter, setTechFilterApply);
    setLocalData("pageNumber", 0, setPageNumber);
  };

  const toggleFavesNews = (item: News) => {
    setNews([]);
    item.isFav = !item.isFav;
    setNews([...news]);
  };

  const handlePageChange = (event: any, page: any) => {
    setLocalData("pageNumber", page - 1, setPageNumber);
  };

  return (
    <div className={cn({"body-container": true, "show-faves": showFaves})}>
      <div className={cn({"header-news-container": true, "show-faves": showFaves})}>
        <FavesFilter showFaves={showFaves} toggleShowFaves={toggleShowFaves} />
        {!showFaves &&
          <SelectFilter
            techFilterApply={techFilterApply}
            applyTechFilter={applyTechFilter}
          />
        }
      </div>
      <div className="body-news-container">
        {news.map((item: News, i: number) => (
          <NewsCard key={i} item={item} toggleFavesNews={toggleFavesNews} />
        ))}
      </div>
      <div className="body-news-footer">
        {!showFaves &&
          <Pagination
            count={9}
            boundaryCount={isMobile ? 0 : 9}
            variant="outlined"
            shape="rounded"
            page={pageNumber + 1}
            onChange={handlePageChange}
          />
        }
      </div>
    </div>
  );
};
