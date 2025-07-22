import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null); // New error state

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d97f0acf3d97478f9188f5221f2b5004&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    setError(null); // Clear error before new attempt
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const parsedData = await response.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setError(null); // Clear error on success
    } catch (error) {
      setError(`Failed to load news: ${error.message}. Please try again later.`);
      setArticles([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  //   handlePrevClick = async () => {
  //     setState({page: page -1});
  //     updateNews();
  //   };

  //   handleNextClick = async () => {
  //     setState({page : page + 1});
  //     updateNews();
  //   };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d97f0acf3d97478f9188f5221f2b5004&page=${nextPage}&pageSize=${props.pageSize}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const parsedData = await response.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setPage(nextPage);
      setError(null); // Clear error on successful fetchMoreData
    } catch (error) {
      setError(`Failed to load more news: ${error.message}. Please check your connection or try again later.`);
      setTotalResults(articles.length); // Stop InfiniteScroll on error
    }
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}
      {!loading && !error && articles.length === 0 && (
        <h3 className="text-center">No available news</h3>
      )}
      <InfiniteScroll
        dataLength={articles.length}
        loadMore={fetchMoreData}
        hasMore={!loading && !error && articles.length !== totalResults} // ensure hasMore is false if error or initial loading
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
