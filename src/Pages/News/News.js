import React from "react";
import { useLoaderData } from "react-router-dom";

const News = () => {
  const news = useLoaderData();
  console.log(news.title);
  return (
    <div>
      <h4>This is news</h4>
    </div>
  );
};

export default News;
