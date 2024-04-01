"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  Theme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
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

const myCustomTheme: Theme = {
  ...darkTheme(),
  fonts: {
    body: "--font-josefin-sans",
  },
  colors: {
    ...darkTheme().colors,
    accentColor:"#192537"

  },

  radii: {
    ...darkTheme().radii,
    connectButton: "5px",
  },
};

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
        <RainbowKitProvider theme={myCustomTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
