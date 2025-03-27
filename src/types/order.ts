
export type TOrderMeal = {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
};



export type TOrder = {
    _id: string;
    customer: {
        _id: string;
        name: string;
        email: string;
        role: string;
    };
    provider: {
        _id: string;
        name: string;
        email: string;
    };
    mealSelection: {
        mealId: TOrderMeal;
        quantity: number;
        _id: string;
    }[];
    dietaryPreferences: string;
    dietaryCategory: string;
    totalPrice: number;
    status: "pending" | "in-progress" | "completed" | "cancelled";
    __v?: number;
};