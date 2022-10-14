import Head from "next/head";
import Image from "next/image";

export default function news({ articles }) {
  return (
    <>
      <Head>
        <title>News App</title>
      </Head>
      <div className="h-full flex items-center flex-col justify-center">
        <h1 className="text-5xl mb-5 font-bold text-green-500">
          TechCrunch News
        </h1>
        <div className="grid m-4 grid-flow-col overflow-x-auto overscroll-contain gap-3 auto-cols-[21%] snap-x news-scroll">
          {articles.length === 0 && <h1>No articles</h1>}
          {articles.length > 0 &&
            articles.map((article, index) => (
              <div
                className="p-6 mb-2 snap-start shadow-lg bg-gray-700 rounded-sm"
                key={index}
              >
                <Image
                  width={370}
                  height={200}
                  alt="Article image"
                  objectFit="cover"
                  quality={100}
                  src={article.urlToImage}
                />
                <h1>{article.title}</h1>
                <a className="text-green-500 " href={article.url}>
                  Full Article
                </a>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const response =
    await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a586d410335d419283d885e3e9217502
  `);

  const { articles } = await response.json();

  return {
    props: {
      articles,
    },
  };
}
