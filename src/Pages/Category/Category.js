import React from "react";
import { useLoaderData } from "react-router-dom";

const Category = () => {
  const categoryNews = useLoaderData();
  console.log(categoryNews);
  return (
    <div>
      <h2>This is category page</h2>
      {categoryNews.map((news) => (
        <li key={news._id}> {news.author.name}</li>
      ))}
    </div>
  );
};

export default Category;
