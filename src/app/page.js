// "use client"
// import {Web3ReactProvider} from "@web3-react/core";
// import {Web3Provider} from "@ethersproject/providers";
// import {injected, walletConnect, walletLink} from "@/app/connectors";
// import MyComponent from "@/app/my-component";
// // import VideoComponent from "@/app/video-component";
// import {createClient, Provider} from "wagmi";
// // import {configureChains, createConfig, WagmiConfig} from "wagmi";
// // import {goerli} from "@wagmi/chains";
// // import { publicProvider } from 'wagmi/providers/public'
// //
// // const { publicClient, webSocketPublicClient } = configureChains(
// //     [goerli],
// //     [publicProvider()],
// // )
// //
// // const config = createConfig({
// //     publicClient,
// //     webSocketPublicClient,
// // })
//
// function getLibrary(provider) {
//     const library = new Web3Provider(provider)
//     library.pollingInterval = 12000
//     return library
// }
// const connectorsByName = {
//     'Injected': injected,
//     'WalletConnect': walletConnect,
//     'WalletLink': walletLink,
// }
// export default function Home() {
//     const client = createClient({ autoConnect: false});
//     return (
//         <Web3ReactProvider getLibrary={getLibrary}>
//             <Provider client={client}>
//             <MyComponent/>
//             </Provider>
//        // </Web3ReactProvider>
//     )
// }
//
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MyComponent from "@/app/my-component";

function Page() {
    return (
        <MyComponent/>
    );
}

export default Page;
