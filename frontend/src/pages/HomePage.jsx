import heroImage from "../assets/hero1.webp"
import React from 'react';
import { HeroParallax } from "../components/HomePage/Hero";
import { NavbarDemo } from "../components/HomePage/Header";
import { Features } from "../components/HomePage/Features";
import { About } from "../components/HomePage/About";
import { Footer } from "../components/HomePage/Footer";

const products = [
  {
    title: "Product 1",
    link: "/",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvJxrc714ZQTY_mNJtfkhvqbH9b6kCAZ-RA&s",
  },
  {
    title: "Product 2",
    link: "/",
    thumbnail: "https://www.herzing.edu/sites/default/files/styles/fp_960_480/public/2020-09/it_computer_programming.jpg.webp?itok=AKSaSh2O",
  },
  {
    title: "Product 3",
    link: "/",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  },
  {
    title: "Product 4",
    link: "/",
    thumbnail: "https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2021_12_Programming-vs-Web-Development.jpg",
  },
  {
    title: "Product 5",
    link: "/",
    thumbnail: "https://inspireip.com/wp-content/uploads/2024/07/what-is-a-hackathon.png",
  },
  
  {
    title: "Product 6",
    link: "/",
    thumbnail: "https://www.brightidea.com/wp-content/uploads/Who_Participates_in_a_Hackathon.png",
  },
  {
    title: "Product 7",
    link: "/",
    thumbnail: "https://www.brainlabsdigital.com/wp-content/uploads/2024/02/Google-Hackathon-Blog-header.png",
  },
  {
    title: "Product 8",
    link: "/",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  },
  {
    title: "Product 9",
    link: "/",
    thumbnail: "https://etimg.etb2bimg.com/thumb/msid-116044248,imgsize-12252,width-1200,height=765,overlay-etgovernment/news/technology/smart-india-hackathon-7th-edition-to-begin-at-51-centers-nationwide-on-dec-11.jpg",
  },
];

const Homepage = () => {
  return (
    <div className="font-primaryFont bg-base-100 h-full text-primary-content">
      {/* Header */}
    <NavbarDemo/>


{/* Hero Section */}
    <HeroParallax products={products}/>
    <Features/>
    <About/>


      {/* About Section */}
      {/* <section id="about" className="py-16 px-6  min-h-screen">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">About Us</h3>
          <p className="text-xl">Our platform makes hackathons more accessible and collaborative for developers everywhere. Whether you're an experienced coder or a beginner, you'll find the perfect environment to learn and grow.</p>
        </div>
      </section> */}

      {/* Footer */}
        <Footer/>
    </div>
  );
};

export default Homepage;
