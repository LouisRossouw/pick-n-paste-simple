import { PastiesArea } from "@/components/pasties-area";

export default function Home() {
  // const { isLight } = useStorage(exampleThemeStorage);

  return (
    <div className="flex h-full w-full">
      <div className="flex h-full w-full items-center justify-center">
        <PastiesArea />
      </div>
    </div>
  );
}
