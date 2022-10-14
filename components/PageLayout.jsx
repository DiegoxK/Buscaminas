import Head from "next/head";
import ParticlesAnimation from "./ParticlesAnimation";
import SideBar from "./SideBar";

function PageLayout({ children }) {
  return (
    <>
      <Head>
        <title>Home!</title>
        <meta name="description" content="Inicio!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar />
      <div className="ml-16 flex flex-col min-h-max bg-gray-800 text-white">
        <ParticlesAnimation />
        <PageContent>{children}</PageContent>
      </div>
    </>
  );
}

const PageContent = ({ children }) => {
  return <div className="absolute h-full w-avaible">{children}</div>;
};

export default PageLayout;
