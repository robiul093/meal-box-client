import BannerSection from '@/components/module/home/Banner'
import HowItWorkSection from '@/components/module/home/HowItWork'
import MenuCategoriesSection from '@/components/module/home/MenuCategories'

export default function HomePage() {
  return (
    <div>
      <BannerSection />
      <MenuCategoriesSection />
      <HowItWorkSection />
    </div>
  )
}
