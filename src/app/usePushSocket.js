import {useEffect, useState} from "react";
import {createSocketConnection, EVENTS} from "@pushprotocol/socket";
import {getCAIPAddress} from "@pushprotocol/socket/src/lib/helpers";
import {useAccount, useNetwork} from "wagmi";

export const usePushSocket = ({env}) => {
    const {address, isConnected} = useAccount();
    const {chain}  = useNetwork();
    const [pushSocket, setPushSocket] = useState();
    const [latestFeedItem, setLatestFeedItem] = useState();
    const [isPushSocketConnected, setIsPushSocketConnected] = useState(
        pushSocket?.connected
    );
    const addSocketEvents = () => {
        pushSocket?.on(EVENTS.CONNECT, () => {
            console.log('connected');
            // setIsConnected(true);
            setIsPushSocketConnected(true);
            console.log('isPushSocketConnected',isPushSocketConnected);
        })

        pushSocket?.on(EVENTS.DISCONNECT, () => {
            // setIsConnected(false);
            setIsPushSocketConnected(false);
            setLatestFeedItem([]);
        })
        // pushSocket?.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message) => {
        //     // setIsConnected(false);
        //     console.log(message);
        //
        // })

        pushSocket?.on(EVENTS.USER_FEEDS, (feedItem) => {
            console.log('USER_FEEDS',feedItem);
            /**
             * "feedItem" is the latest notification received
             */
            setLatestFeedItem(feedItem);
        })
        pushSocket?.on(EVENTS.CHAT_RECEIVED_MESSAGE, (feedItem) => {
            console.log('CHAT_RECEIVED_MESSAGE',feedItem);
            /**
             * "feedItem" is the latest notification received
             */
            // setLatestFeedItem(feedItem);
        })
        pushSocket?.on(EVENTS.CHAT_GROUPS, (feedItem) => {
            console.log('CHAT_GROUPS',feedItem);
            /**
             * "feedItem" is the latest notification received
             */
            // setLatestFeedItem(feedItem);
        })
        // pushSocket?.on(EVENTS.USER_SPAM_FEEDS, (feedItem) => {
        //     /**
        //      * "feedItem" is the latest notification received
        //      */
        //     console.log(feedItem);
        // })
        // pushSocket?.on(EVENTS.CHAT_GROUPS, (feedItem) => {
        //     /**
        //      * "feedItem" is the latest notification received
        //      */
        //     console.log(feedItem);
        // })
    };
    const removeSocketEvents = () => {
        pushSocket?.off(EVENTS.CONNECT);
        pushSocket?.off(EVENTS.DISCONNECT);
        pushSocket?.off(EVENTS.USER_FEEDS);
    };

    useEffect(() => {
        console.log('pushSocket, in', pushSocket);
        if (pushSocket) {
            addSocketEvents();
        }
        return () => {
            removeSocketEvents();
        };
    }, [pushSocket]);

    useEffect(() => {
        if (address) {
            if (pushSocket) {
                pushSocket?.disconnect();
            }
            const connectionObject = createSocketConnection({
                user: getCAIPAddress(env, address, "User"),
                env,
                socketOptions: {autoConnect: true}
            })
            setPushSocket(connectionObject);
        }
    }, [address, 'staging', chain?.id]);

    return {pushSocket, isPushSocketConnected, latestFeedItem}
}


