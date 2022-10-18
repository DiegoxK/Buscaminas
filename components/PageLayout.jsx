import ParticlesAnimation from "./ParticlesAnimation";
import SideBar from "./SideBar";
import Router from "next/router";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });
NProgress.configure({ parent: "#content" });

function PageLayout({ children }) {
  return (
    <>
      <SideBar />
      <div className="ml-16 flex flex-col min-h-max bg-gray-800 text-white">
        <ParticlesAnimation />
        <PageContent>{children}</PageContent>
      </div>
    </>
  );
}

const PageContent = ({ children }) => {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <div id="content" className="absolute h-full w-avaible">
      {children}
    </div>
  );
};

export default PageLayout;
