"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  arbitrumSepolia,
  gnosisChiado,
  morphSepolia,
  neonDevnet,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    
  const config = getDefaultConfig({
    appName: "adlink",
    projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID!,
    chains: [arbitrumSepolia, gnosisChiado, morphSepolia, neonDevnet],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
