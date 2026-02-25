import Link from "next/link";
import { Facebook, Github, Instagram, Pin, Twitter, Youtube } from "lucide-react";
import { NewsletterSignup } from "@/components/shared/newsletter-signup";

const footerLinks = {
    product: [
        { name: "Courses", href: "/browse" },
        { name: "Coupons", href: "/coupons" },
        { name: "Reviews", href: "/reviews" },
        { name: "Comparisons", href: "/comparisons" },
    ],
    company: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Affiliate Disclosure", href: "/disclosure" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-slate-950/10 backdrop-blur-xl">
            <div className="mx-auto container px-4 py-12 md:px-6 lg:py-16">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="mb-4 flex items-center space-x-2">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-cyan-500/15" />
                            <span className="text-sm font-semibold tracking-tight">SkillPerks</span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                            Empowering developers to make informed decisions about online learning. Verified coupons, expert reviews, and smart comparisons.
                        </p>
                        <div className="mt-6 space-y-2">
                            <div className="text-sm font-semibold text-foreground">Newsletter</div>
                            <div className="text-xs text-muted-foreground">Deal alerts + new guides. No spam.</div>
                            <NewsletterSignup />
                        </div>
                        <div className="mt-6 flex flex-nowrap items-center gap-4">
                            <Link href="https://github.com/skillperks" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="https://www.instagram.com/skillperks" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="https://www.youtube.com/@skillperks" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </Link>
                            <Link href="https://www.pinterest.com/skillperks" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">
                                <Pin className="h-5 w-5" />
                                <span className="sr-only">Pinterest</span>
                            </Link>
                            <Link href="https://x.com/skillperks" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">X</span>
                            </Link>
                            <Link href="https://www.facebook.com/profile.php?id=61588161494635" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Product</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.product.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Company</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Legal</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.legal.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/5 pt-8">
                    <p className="text-center text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} SkillPerks. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
