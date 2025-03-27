import Image from 'next/image'
import React from 'react'

export default function HowItWorkSection() {
  return (
    <div className='my-20'>
      <div className='text-center mb-12'>
        <h2 className='text-2xl text-[#484848]'>HOW IT WORKS</h2>
      </div>
      <div className='flex justify-evenly items-center text-center'>
        
        <div className='w-[300px]'>
          <Image src={'https://madang.kenzap.com/wp-content/themes/madang-child/images/meal.svg'} width={90} height={90} className='mx-auto' alt='sectionImg' />
          <h2 className='text-[22px] text-[#575757] my-5 capitalize'>Choose Your Favorite</h2>
          <p className='text-lg text-[#484848]'>Choose your favorite meals and order online or by phone. It&#39s easy to customize your order. </p>
        </div>

        <div className='w-[300px]'>
          <Image src={'https://madang.kenzap.com/wp-content/themes/madang-child/images/delivery.svg'} width={90} height={90} className='mx-auto' alt='sectionImg' />
          <h2 className='text-[22px] text-[#575757] my-5 capitalize'>Choose Your Favorite</h2>
          <p className='text-lg text-[#484848]'>Choose your favorite meals and order online or by phone. It&#39s easy to customize your order. </p>
        </div>

        <div className='w-[300px]'>
          <Image src={'https://madang.kenzap.com/wp-content/themes/madang-child/images/eat-enjoy.svg'} width={90} height={90} className='mx-auto' alt='sectionImg' />
          <h2 className='text-[22px] text-[#575757] my-5 capitalize'>Choose Your Favorite</h2>
          <p className='text-lg text-[#484848]'>Choose your favorite meals and order online or by phone. It&#39s easy to customize your order. </p>
        </div>
        
      </div>
    </div>
  )
}
