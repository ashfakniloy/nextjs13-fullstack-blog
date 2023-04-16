import SessionProvider from "@/components/Session";
import Theme from "@/components/Theme";
import ToastNotification from "@/components/ToastNotification";
import { Roboto, Montserrat, Inter } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJS 13 Fullstack Blog Website",
  description: "A fullstack blog website using nextjs app directory.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const dark = '#121212'
  // const dark2 = '#1B1A1A'

  return (
    <html
      lang="en"
      className={`${roboto.variable} ${montserrat.variable} ${inter.className}`}
    >
      <body className="bg-gray-200/70 dark:bg-custom-gray">
        <Theme>
          <ToastNotification
            toastOptions={{
              duration: 3000,
            }}
          />
          <div className="text-black dark:text-gray-50">
            <SessionProvider>{children}</SessionProvider>
          </div>
        </Theme>
      </body>
    </html>
  );
}
