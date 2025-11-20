import "./globals.css";
import react from "react";

export const metadata = {
  title: "CryptoTrack",
  description: "A secure, role-based cryptocurrency portfolio tracker with real-time market insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}