"use client"

import "@rainbow-me/rainbowkit/styles.css";
import {useEffect, useState} from "react";
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zora,
    goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {Wrapper} from "@/app/wrapper";
//
const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        goerli,
        mainnet,
        polygon,
        optimism,
        arbitrum,
        zora,
    ],
    [publicProvider()]
);

const projectId = 'YOUR_PROJECT_ID';

const { wallets } = getDefaultWallets({
    appName: 'RainbowKit demo',
    projectId,
    chains,
});

const demoAppInfo = {
    appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
    ...wallets,
]);
// import { Provider, createClient } from 'wagmi'

// const client = createClient()


const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});
export default function Provider({ children }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
            <Wrapper>
                {mounted && children}
            </Wrapper>
            </RainbowKitProvider>
         </WagmiConfig>
    )
}

