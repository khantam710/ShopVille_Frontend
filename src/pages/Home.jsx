import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home' && window.clevertap) {
      window.clevertap.event.push("Page Visit Event", {
        page: "Home",
        title: document.title,
        url: window.location.href
      });
      console.log("CleverTap: Page Visit Event triggered with properties");
    }
  }, [location]);

  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
