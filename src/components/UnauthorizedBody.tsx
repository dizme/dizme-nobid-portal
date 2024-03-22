import Link from "next/link";
import Button from "./walt/button/Button";

export default function UnauthorizedBody() {
    return (
        <div className="flex flex-col space-y-3 justify-center items-center h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Permission denied</h1>
            <p>You need to be logged in to access this page.</p>
            {/* Wrap Button with Link using 'a' as Button's child */}
            <Link href="/" passHref>
                <Button className="mt-4">Go to Login page</Button>
            </Link>
        </div>
    );
}
