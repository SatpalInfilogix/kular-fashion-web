'use client';

import Header from '@/components/global/header';
import HeroSection from '@/components/home/hero-section';
import FeaturedCategories from '@/components/home/featured-categories';
import Testimonials from '@/components/home/testimonials';
import Brands from '@/components/home/brands';
import NewArrivals from '@/components/home/new-arrivals';
import SubscribeNewsletter from '@/components/global/subscribe-newsletter';

export default function HomePage() {
  return (
    <>
     
      <div className="w-full">
        <HeroSection />
        <FeaturedCategories />
        <Testimonials />
        <Brands />
        <NewArrivals />
        <SubscribeNewsletter />
      </div>
    </>
  );
}
