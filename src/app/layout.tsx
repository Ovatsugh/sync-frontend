// "use client"
import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import MainContent from '../layouts/MainContent/MainContent'
import Notifier from '../components/Notifier/Notifier'

export const metadata: Metadata = {
  title: "Sync Manager",
  description: "",
  icons: {
    icon:['/favicon.ico?v=4']
  }
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
          <MainContent>
            {children}
          </MainContent>
        </body>
    </html>

  );
}
