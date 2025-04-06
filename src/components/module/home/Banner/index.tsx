'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import banner1 from '../../../../../public/home-banner1.jpg';
import banner2 from '../../../../app/assets/home-banner2.jpg';
import banner3 from '../../../../app/assets/home-banner3.jpg';

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
                    delay: 1500,
                    disableOnInteraction: true,
                }}
                navigation={true}
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
                className=''>
                    <div>
                        <h2 className='md:text-6xl md:mr-36 leading-[70px]'>Healthy Food, <br /><span className='text-[#60ba62] '>For Breakfast.</span></h2>
                        <p className='md:w-[400px] text-[#6a6a69] mt-6'>We deliver healthy food that are ready to eat. Just choose your own menu you like.</p>
                        <button className='bg-[#60ba62] hover:bg-[#f7ca18] text-white px-12 py-3 mt-6 text-end'>Learn More</button>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{
                    backgroundImage: `url(${banner2.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'lightgray', 
                    height: '100vh',  
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'left',
                    padding: '0 0 0 144px',
                    alignItems: 'center',
                }}
                className=''>
                    <div>
                        <h2 className='md:text-6xl leading-[70px]'>Healthy <br /> Inside, Fresh <br /><span className='text-[#60ba62] '>Outside</span></h2>
                        <p className='md:w-[400px] text-[#6a6a69] mt-7'>We deliver healthy food that are ready to eat. Just choose your own menu you like.</p>
                        <button className='bg-[#60ba62] hover:bg-[#f7ca18] text-white px-12 py-3 mt-7 text-end'>Learn More</button>
                    </div>
                </SwiperSlide>

                <SwiperSlide style={{
                    backgroundImage: `url(${banner3.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'lightgray', 
                    height: '100vh',  
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
                className=''>
                    <div className='text-center mb-44'>
                        <h2 className='md:text-6xl leading-[70px]'>Healthy Food Comes From <br /><span className='text-[#60ba62] '>Healthy Ingredients</span></h2>
                        <p className='text-[#6a6a69] mt-6'>We deliver healthy food that are ready to eat. Just choose your own menu you like.</p>
                        <button className='bg-[#60ba62] hover:bg-[#f7ca18] text-white px-[100px] py-3 mt-6 text-end'>Learn More</button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
