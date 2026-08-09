"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
    { href: "/", label: "Dashboard" },
    { href: "/customers", label: "Customers" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="border-b">
            <div className="max-w-7xl mx-auto px-8 h-14 flex items-center gap-6">
                <span className="font-semibold text-sm">Vantage</span>
                <nav className="flex gap-4">
                    {links.map((link) => {
                        // /customers/[id] тоже должен подсвечивать пункт Customers
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm transition-colors hover:text-foreground",
                                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
                <ThemeToggle />
            </div>
        </header>
    );
}