import Footer from '../../Components/Footer/Footer.jsx';
import ProductCatalog from '../ProductCatalog/ProductCatalog.jsx';
import ProductCardList from '../../Components/ProductCard/ProductCardList.jsx';
import ProductCardSwiper from '../../Components/ProductCard/ProductCardSwiper.jsx';
import Header from '/src/Components/Header/Header.jsx';
import Hero from '../../Components/Hero/Hero';
import OfferCard from '../../Components/Offercards/Offercards.jsx';
import ShopFilters from '../../Components/ShopFilters/ShopFilters.jsx';
import Brands from '../../Components/Brands/Brands.jsx';
import { Shopping, Traveling } from '../../Components/Posters/Posters.jsx';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Brands />
      <OfferCard />
      <ShopFilters />
      <Shopping />
      <ProductCardList title="Featured Items">
        <ProductCardSwiper swiperId="featured" />
      </ProductCardList>
      <ProductCardList title="Most Popular">
        <ProductCardSwiper swiperId="popular" />
      </ProductCardList>
      <Traveling />
    </>
  );
};

export default HomePage;
