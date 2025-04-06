import Image, { StaticImageData } from 'next/image'

export default function MenuCategoriesCard({ title , bgImg}: { title: string, bgImg: string | StaticImageData }) {
    return (
        <div
            className="relative w-64 h-72 rounded-md overflow-hidden shadow-lg group cursor-pointer"
        >
            <Image
                src={bgImg}
                alt="title"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
                <div>
                    <h2 className="text-xl text-white uppercase font-normal">{title}</h2>
                </div>
            </div>
        </div>
    )
}
