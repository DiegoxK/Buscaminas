import Head from "next/head";
import SideBar from "./SideBar";

function PageLayout({ children, title = "Buscaminas" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Inicio!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-800 text-white">
        <SideBar />
        <PageContent>{children}</PageContent>
      </div>
    </>
  );
}

const PageContent = ({ children }) => {
  return <div className="min-h-screen ml-16">{children}</div>;
};

export default PageLayout;
