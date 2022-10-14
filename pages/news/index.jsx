import Head from "next/head";
import Image from "next/image";

export default function news({ articles }) {
  const recent = articles[0];
  return (
    <>
      <Head>
        <title>News App</title>
      </Head>
      <div className="m-4 flex items-center flex-col justify-center">
        <h1 className="text-5xl mb-5 font-bold text-green-500">
          TechCrunch News
        </h1>
        <div className="bg-gray-700 w-full self-start p-5 flex">
          <Image
            width={370}
            height={250}
            src={recent.urlToImage}
            alt="most recent"
          />
          <div className="ml-5 flex w-full flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">{recent.title}</h1>
              <p className="font-semibold">
                {recent.author} - {recent.publishedAt}
              </p>
              <br />
              <p>{recent.description}</p>
            </div>
            <a className="text-green-500 self-end" href={recent.url}>
              Full Article
            </a>
          </div>
        </div>
      </div>
      <div className="mx-4 mb-5">
        <div className="grid  grid-flow-col overflow-x-auto overscroll-contain gap-3 auto-cols-[21%] snap-x news-scroll">
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
