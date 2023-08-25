import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body>
        <Providers>
          <LoadingProvider>{children}</LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
import { LoadingProvider } from "@/context/LoaderContext";
