import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <Link
                href="/"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
                Create Request
            </Link>

            <Link
                href="/requests"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
                Dashboard
            </Link>
        </nav>
    );
}