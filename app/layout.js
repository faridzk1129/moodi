import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
const opensans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "moodi",
  description: "track your daily mood every day of the year",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <h1 className={"text-base sm:text-lg textGradient " + fugaz.className}>
        Moodi
      </h1>
    </header>
  );
  const footer = <footer className="p-4 sm:py-8">footer</footer>;

  return (
    <html lang="en">
      <body
        className={
          "w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 " +
          opensans.className
        }
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
