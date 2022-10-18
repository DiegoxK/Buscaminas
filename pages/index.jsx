import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        className="rounded-full"
        src={"/a.png"}
        width="206"
        height="206"
        alt="home image"
      />
      <h1 className="mt-5 text-green-300 text-lg">Salutations!</h1>
    </div>
  );
}
