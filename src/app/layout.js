import {Michroma, Saira} from 'next/font/google'
import './globals.css'

const michroma = Michroma ({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
});

const saira = Saira ({
  subsets: ["latin"],
  variable: "--font-saira",
});

export const metadata = {
  title: "Memory Card Adi | Muh Adi Kusuma Wiranta",
  description: "Portofolio Muh Adi Kusuma Wiranta, Front-End Developer dan UI/UX Designer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${michroma.variable} ${saira.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}