import type { Metadata } from "next";
import './globals.css';



export const metadata: Metadata = {
  title: "SAC Admin Portal",
  description: "Generated by SAC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={'${inter.className} text-stone-950 bg-stone-100'}>
      {children}
    </body>
  </html>
  );
}
