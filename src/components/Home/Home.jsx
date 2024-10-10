import Header from "./sections/Header";
import HomeAbout from "./sections/HomeAbout";
import HomeFooter from "./sections/HomeFooter";
import HomeHero from "./sections/HomeHero";
import HomeServices from "./sections/HomeServices";

export default function Home() {
  return (
    <div>
      <Header />
      <HomeHero />
      <HomeAbout />
      <HomeServices />
      <HomeFooter />
    </div>
  );
}
