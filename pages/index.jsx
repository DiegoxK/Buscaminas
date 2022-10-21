import Image from "next/image";
import HeroImage from "../public/hero.svg";

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-end gap-4 mr-12">
        <h1 className="bg-gray-900 p-5 relative font-bold text-right rounded-md text-green-500 text-xl chat after:-bottom-0 after:-right-5 after:absolute">
          Welcome to my NextJs Aplication Testing App
        </h1>
        <p className="bg-gray-900 px-5 py-4 w-fit relative text-right rounded-md text-white text-xl chat after:-bottom-0 after:-right-5 after:absolute">
          My place for web app testing with Next JS!
        </p>
        <p className="bg-gray-900 px-5 py-4 w-fit relative text-right rounded-md text-white text-xl chat after:-bottom-0 after:-right-5 after:absolute">
          You can find the source code on my{" "}
          <span className="text-green-500">
            <a href="https://github.com/DiegoxK/NextJsTesting">Github</a>
          </span>
        </p>
      </div>
      <div>
        <Image width={600} src={HeroImage} alt="home image" />
      </div>
    </div>
  );
}
