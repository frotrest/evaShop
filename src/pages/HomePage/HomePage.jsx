import Hero from '../../Components/Hero/Hero.jsx';
import Brands from '../../Components/Brands/Brands.jsx';
import OfferCards from '../../Components/Offercards/OfferCards.jsx';
import ProductCardList from '../../Components/ProductCard/ProductCardList.jsx';
import ProductCardSwiper from '../../Components/ProductCard/ProductCardSwiper.jsx';
import ShopFilters from '../../Components/ShopFilters/ShopFilters.jsx';
import { Shopping, Traveling } from '../../Components/Posters/Posters.jsx';

const HomePage = () => {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Hero />
      <Brands />
      <OfferCards />
      <ProductCardList
        title="Trending Highlights"
        eyebrow="SPRING / SUMMER 2026"
        viewAllLink="/catalog"
        swiperId="featured"
      >
        <ProductCardSwiper swiperId="featured" />
      </ProductCardList>
      <Shopping />
      <ShopFilters shopId="mainFilters" />
      <ProductCardList
        title="Most Coveted Pieces"
        eyebrow="TIMELESS ESSENTIALS"
        viewAllLink="/catalog"
        swiperId="popular"
      >
        <ProductCardSwiper swiperId="popular" />
      </ProductCardList>
      <Traveling />
    </main>
  );
};

export default HomePage;
