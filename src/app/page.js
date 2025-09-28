import Header from "@/component/Header/page";
import Like from "@/component/MusicPlayer/page";
import RightSidebar from "@/component/RightSidebar/page";
export default function Home() {
  return (
    <>
      <Header />
      <main className="layout">
        <div className="layout-left">
          <Like />
        </div>
        <div className="layout-right">
              <RightSidebar />

        </div>
      </main>
    </>
  );
}
