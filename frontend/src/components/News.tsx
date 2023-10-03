import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const News = () => {
  const [newsArticles, setNewsArticles] = useState<any[] | null>(null);
  const { state } = useParams();

  useEffect(() => {
    const getNews = async () => {
      const API_KEY = "9c6672843352485fbf99ce6139ede318";
      const API_ENDPOINT = `https://newsapi.org/v2/top-headlines?country=in&category=health&q=${state}`;
      const res = await axios.get(`${API_ENDPOINT}&apiKey=${API_KEY}`);
      setNewsArticles(res.data.articles);
    };
    getNews();
  }, [state]);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-2xl ml-[50px] px-4 py-8">
        <h1 className="text-blue-600 text-2xl font-bold mb-4">
          Business News Headlines
        </h1>
        {newsArticles?.map((ele: any, i: number) => (
          <div key={i} className="border-b py-4">
            <p className="text-gray-500 mb-1">{ele.author}</p>
            <h2 className="text-xl font-semibold mb-2">{ele.title}</h2>
            <p className="text-gray-800">{ele.description}</p>
            <br />
            <p className="text-gray-800">
              For more info visit:{" "}
              <a href={ele.url}>
                {" "}
                <span className="text-blue-400">here</span>
              </a>
            </p>
          </div>
        ))}
        {!newsArticles && <p className="text-center">Loading...</p>}
      </div>
    </div>
  );
};
export default News;
