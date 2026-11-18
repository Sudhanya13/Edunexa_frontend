import "./globals.css";
import SiteChrome from "@/components/ui/shared/SiteChrome";

export const metadata = {
  title: "Edunexa - Learn without limits",
  description: "Find trusted tutors and the right tuition for your goals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
