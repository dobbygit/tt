import { AppProps } from "next/app";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageTransition from "@/components/PageTransition";
import "@/index.css";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      </Suspense>
    </ErrorBoundary>
  );
}
