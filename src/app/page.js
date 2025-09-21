import Header from "@/component/Header/page";
import Like from "@/component/Like/page";

export default function Home() {
  return (
    <>
      <Header />
      <main className="layout">
        <div className="layout-left">
          <Like />
        </div>
        <div className="layout-right">
         
        </div>
      </main>
    </>
  );
}
