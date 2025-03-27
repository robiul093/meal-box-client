import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-4 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
            <Link href="/">
                <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Return Home</button>
            </Link>
        </div>
    );
}