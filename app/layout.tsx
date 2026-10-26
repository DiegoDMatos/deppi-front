import type { Metadata } from "next";
import { Space_Grotesk,  Inter_Tight, JetBrains_Mono} from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context"

const spaceGrotest = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: '--font-inter-tight'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
});

export const metadata: Metadata = {
  title: "Deppi - IFCE",
  description: "Cursos de extensão do IFCE",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotest.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        </body>
    </html>
  );
}
