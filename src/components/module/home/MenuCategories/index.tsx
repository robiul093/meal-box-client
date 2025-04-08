import MenuCategoriesCard from "./MenuCategoriesCard";
import img1 from '../../../../app/assets/breakFastCategory.jpg'
import img2 from '../../../../app/assets/dessert.jpg'
import img3 from '../../../../app/assets/dinner.jpg'
import img4 from '../../../../app/assets/fist&meat.jpg'
import img5 from '../../../../app/assets/lunch.jpg'
import img6 from '../../../../app/assets/salads.jpg'
import img7 from '../../../../app/assets/soup.jpg'
import img8 from '../../../../app/assets/vegetarian.jpg'

export default function MenuCategoriesSection() {

    const menuCategories = [
        {
            title: 'BreakFast',
            image: img1
        },
        {
            title: 'Dessert',
            image: img2
        },
        {
            title: 'Dinner',
            image: img3
        },
        {
            title: 'Meat & Fish',
            image: img4
        },
        {
            title: 'Lunch',
            image: img5
        },
        {
            title: 'Salads',
            image: img6
        },
        {
            title: 'Soups',
            image: img7
        },
        {
            title: 'Vegetarian',
            image: img8
        },
    ]
    
    return (
        <div className="my-24 w-[80%] mx-auto">
            <div className='text-center mb-14'>
                <h2 className='text-2xl text-[#484848]'>MENU CATEGORIES</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-5">
                {
                    menuCategories?.map((category, idx) => <MenuCategoriesCard title={category?.title} bgImg={category?.image}/>)
                }
            </div>
        </div>
    )
}
