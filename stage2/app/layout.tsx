import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Campus Notifications | Affordmed",
  description: "Real-time updates for Placements, Events, and Results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navbar />
          <Box component="main" sx={{ p: 3, minHeight: '100vh', bgcolor: 'background.default' }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
