import { Suspense } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body>
                <Suspense>
                    {children}
                </Suspense>
            </body>
        </html>
    );
}