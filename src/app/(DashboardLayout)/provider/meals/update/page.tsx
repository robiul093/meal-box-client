export const dynamic = "force-dynamic";

import { CardWithForm } from '@/components/module/meal/MealCard';
import { getProviderMeal } from '@/service/Meal';
import { TMeal } from '@/types';



export default async function UpdateMeal() {


  const res = await getProviderMeal();
  const data = res?.data;

  return (
    <div>
      <div className='grid md:grid-cols-2 gap-5'>
        {Array.isArray(data) ? data.map((item: TMeal, idx: number) => <CardWithForm key={idx} item={item} />) : <p>No meals found</p>}
      </div>
    </div>
  )
}
