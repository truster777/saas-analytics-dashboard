import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">404</p>
            <h1 className="text-3xl font-semibold">Page not found</h1>
            <p className="text-muted-foreground max-w-sm">
                The page you're looking for doesn't exist or may have been moved.
            </p>
            <Link href="/" className={buttonVariants({ className: "mt-2" })}>
                Back to dashboard
            </Link>
        </main>
    );
}