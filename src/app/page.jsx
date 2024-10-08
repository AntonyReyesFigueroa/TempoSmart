
import Footer from "@/structures/footer/footer";
import Header from "@/structures/header/header";
import Main from "@/structures/main/main";


export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">

          <Main />
        </div>
        <Footer />
      </div>
    </div>
  );
}


