

export type TMeal = {
    _id?: string;
    provider?: string;
    name: string;
    description: string;
    image: string;
    price: number;
    dietaryCategory: string;
    ingredients: string[];
    available?: boolean;
}
