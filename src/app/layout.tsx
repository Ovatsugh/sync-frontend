// "use client"
import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import Navbar from '../layouts/Navbar/Navbar'
import MainContent from '../layouts/MainContent/MainContent'
import Notifier from '../components/Notifier/Notifier'

export const metadata: Metadata = {
  title: "Sync Manager",
  description: "",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (

    <html>
        <body>
          <Notifier />
          {/* <Navbar /> */}
          <MainContent>
            {children}
          </MainContent>
        </body>
    </html>

  );
}
