'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import banner1 from '../../../../../public/home-banner1.jpg';

export default function BannerSection() {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 1000,
                    // disableOnInteraction: false,
                }}
                // navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className="mySwiper swiper-container"

            >
                <SwiperSlide style={{
                    backgroundImage: `url(${banner1.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'lightgray', 
                    height: '100vh',  
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                }}
                className='h-screen '>
                    <div>
                        <h2 className='md:text-6xl md:mr-36'>Healthy Food, <br /><span className='text-[#60ba62] '>For Breakfast.</span></h2>
                        <p className='md:w-[400px] text-[#6a6a69] mt-7'>We deliver healthy food that are ready to eat. Just choose your own menu you like.</p>
                        <button className='bg-[#60ba62] text-white px-12 py-3 mt-8 text-end'>Learn More</button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
