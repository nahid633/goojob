import Link from "next/link";
import {ConnectButton} from "@rainbow-me/rainbowkit";

export const Header = () => {
    return (<>
        <div className="w-full h-32 relative bg-indigo-500 flex justify-between items-center px-32">
            <div className="w-auto h-auto relative flex-col justify-start items-start flex">
                <Link href='/client'>
                    <svg width="88" height="18" viewBox="0 0 88 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.54904 17.6558C7.3107 17.6558 6.16934 17.4618 5.12495 17.0739C4.09548 16.6711 3.19284 16.1041 2.41701 15.3731C1.6561 14.642 1.05931 13.7841 0.626631 12.7994C0.208877 11.8147 0 10.733 0 9.55433C0 8.37567 0.208877 7.29399 0.626631 6.30928C1.05931 5.32457 1.66356 4.46668 2.43939 3.73561C3.21522 3.00454 4.12532 2.44505 5.16971 2.05714C6.21409 1.6543 7.36292 1.45289 8.61618 1.45289C10.0037 1.45289 11.2495 1.68414 12.3536 2.14666C13.4726 2.60917 14.4125 3.28056 15.1734 4.16083L12.8459 6.30928C12.279 5.71249 11.6598 5.27235 10.9884 4.98888C10.317 4.69048 9.58597 4.54128 8.79522 4.54128C8.03431 4.54128 7.34054 4.66064 6.71391 4.89936C6.08728 5.13807 5.5427 5.48123 5.08019 5.92882C4.6326 6.37642 4.28198 6.90607 4.02834 7.51778C3.78963 8.12949 3.67027 8.80834 3.67027 9.55433C3.67027 10.2854 3.78963 10.9568 4.02834 11.5685C4.28198 12.1802 4.6326 12.7173 5.08019 13.1798C5.5427 13.6274 6.07982 13.9706 6.69153 14.2093C7.31816 14.448 8.00447 14.5674 8.75046 14.5674C9.46661 14.5674 10.1604 14.4555 10.8318 14.2317C11.5181 13.993 12.182 13.5976 12.8236 13.0456L14.8825 15.664C14.0321 16.3055 13.0399 16.7979 11.906 17.1411C10.787 17.4842 9.66803 17.6558 8.54904 17.6558ZM11.5703 15.194V9.30816H14.8825V15.664L11.5703 15.194Z"
                            fill="white"/>
                        <path
                            d="M23.7333 17.5663C22.4502 17.5663 21.3088 17.2977 20.3092 16.7606C19.3245 16.2235 18.5412 15.4924 17.9594 14.5674C17.3924 13.6274 17.1089 12.5607 17.1089 11.3671C17.1089 10.1586 17.3924 9.09182 17.9594 8.16679C18.5412 7.22685 19.3245 6.49578 20.3092 5.97358C21.3088 5.43647 22.4502 5.16791 23.7333 5.16791C25.0015 5.16791 26.1354 5.43647 27.135 5.97358C28.1347 6.49578 28.9179 7.21939 29.4849 8.14441C30.0518 9.06944 30.3353 10.1437 30.3353 11.3671C30.3353 12.5607 30.0518 13.6274 29.4849 14.5674C28.9179 15.4924 28.1347 16.2235 27.135 16.7606C26.1354 17.2977 25.0015 17.5663 23.7333 17.5663ZM23.7333 14.7017C24.3152 14.7017 24.8374 14.5674 25.2999 14.2988C25.7624 14.0303 26.1279 13.6498 26.3965 13.1575C26.6651 12.6502 26.7993 12.0534 26.7993 11.3671C26.7993 10.6659 26.6651 10.0691 26.3965 9.57671C26.1279 9.08436 25.7624 8.70391 25.2999 8.43535C24.8374 8.16679 24.3152 8.03252 23.7333 8.03252C23.1514 8.03252 22.6292 8.16679 22.1667 8.43535C21.7042 8.70391 21.3312 9.08436 21.0478 9.57671C20.7792 10.0691 20.6449 10.6659 20.6449 11.3671C20.6449 12.0534 20.7792 12.6502 21.0478 13.1575C21.3312 13.6498 21.7042 14.0303 22.1667 14.2988C22.6292 14.5674 23.1514 14.7017 23.7333 14.7017Z"
                            fill="white"/>
                        <path
                            d="M38.3981 17.5663C37.115 17.5663 35.9737 17.2977 34.974 16.7606C33.9893 16.2235 33.206 15.4924 32.6242 14.5674C32.0572 13.6274 31.7737 12.5607 31.7737 11.3671C31.7737 10.1586 32.0572 9.09182 32.6242 8.16679C33.206 7.22685 33.9893 6.49578 34.974 5.97358C35.9737 5.43647 37.115 5.16791 38.3981 5.16791C39.6663 5.16791 40.8002 5.43647 41.7998 5.97358C42.7995 6.49578 43.5828 7.21939 44.1497 8.14441C44.7167 9.06944 45.0001 10.1437 45.0001 11.3671C45.0001 12.5607 44.7167 13.6274 44.1497 14.5674C43.5828 15.4924 42.7995 16.2235 41.7998 16.7606C40.8002 17.2977 39.6663 17.5663 38.3981 17.5663ZM38.3981 14.7017C38.98 14.7017 39.5022 14.5674 39.9647 14.2988C40.4272 14.0303 40.7928 13.6498 41.0613 13.1575C41.3299 12.6502 41.4641 12.0534 41.4641 11.3671C41.4641 10.6659 41.3299 10.0691 41.0613 9.57671C40.7928 9.08436 40.4272 8.70391 39.9647 8.43535C39.5022 8.16679 38.98 8.03252 38.3981 8.03252C37.8163 8.03252 37.2941 8.16679 36.8316 8.43535C36.369 8.70391 35.996 9.08436 35.7126 9.57671C35.444 10.0691 35.3097 10.6659 35.3097 11.3671C35.3097 12.0534 35.444 12.6502 35.7126 13.1575C35.996 13.6498 36.369 14.0303 36.8316 14.2988C37.2941 14.5674 37.8163 14.7017 38.3981 14.7017Z"
                            fill="white"/>
                        <path
                            d="M50.4669 17.6558C49.4076 17.6558 48.4304 17.4618 47.5352 17.0739C46.6549 16.6711 45.9313 16.1041 45.3643 15.3731L47.3785 12.956C47.8112 13.523 48.2662 13.9557 48.7437 14.2541C49.2211 14.5375 49.7358 14.6793 50.2879 14.6793C51.7649 14.6793 52.5035 13.8139 52.5035 12.0832V4.6308H46.9981V1.72144H56.1066V11.8818C56.1066 13.8214 55.6292 15.2686 54.6743 16.2235C53.7194 17.1783 52.317 17.6558 50.4669 17.6558Z"
                            fill="white"/>
                        <path
                            d="M65.1707 17.5663C63.8876 17.5663 62.7463 17.2977 61.7466 16.7606C60.7619 16.2235 59.9786 15.4924 59.3968 14.5674C58.8298 13.6274 58.5463 12.5607 58.5463 11.3671C58.5463 10.1586 58.8298 9.09182 59.3968 8.16679C59.9786 7.22685 60.7619 6.49578 61.7466 5.97358C62.7463 5.43647 63.8876 5.16791 65.1707 5.16791C66.4389 5.16791 67.5728 5.43647 68.5724 5.97358C69.5721 6.49578 70.3553 7.21939 70.9223 8.14441C71.4892 9.06944 71.7727 10.1437 71.7727 11.3671C71.7727 12.5607 71.4892 13.6274 70.9223 14.5674C70.3553 15.4924 69.5721 16.2235 68.5724 16.7606C67.5728 17.2977 66.4389 17.5663 65.1707 17.5663ZM65.1707 14.7017C65.7526 14.7017 66.2748 14.5674 66.7373 14.2988C67.1998 14.0303 67.5653 13.6498 67.8339 13.1575C68.1025 12.6502 68.2367 12.0534 68.2367 11.3671C68.2367 10.6659 68.1025 10.0691 67.8339 9.57671C67.5653 9.08436 67.1998 8.70391 66.7373 8.43535C66.2748 8.16679 65.7526 8.03252 65.1707 8.03252C64.5888 8.03252 64.0667 8.16679 63.6041 8.43535C63.1416 8.70391 62.7686 9.08436 62.4852 9.57671C62.2166 10.0691 62.0823 10.6659 62.0823 11.3671C62.0823 12.0534 62.2166 12.6502 62.4852 13.1575C62.7686 13.6498 63.1416 14.0303 63.6041 14.2988C64.0667 14.5674 64.5888 14.7017 65.1707 14.7017Z"
                            fill="white"/>
                        <path
                            d="M81.2231 17.5663C80.1638 17.5663 79.2537 17.3425 78.4928 16.8949C77.7318 16.4473 77.15 15.7684 76.7471 14.8583C76.3443 13.9333 76.1429 12.7696 76.1429 11.3671C76.1429 9.94971 76.3518 8.78596 76.7695 7.87586C77.2022 6.96575 77.799 6.2869 78.5599 5.8393C79.3208 5.39171 80.2085 5.16791 81.2231 5.16791C82.357 5.16791 83.3715 5.42155 84.2667 5.92882C85.1768 6.4361 85.893 7.15225 86.4152 8.07727C86.9523 9.0023 87.2208 10.0989 87.2208 11.3671C87.2208 12.6204 86.9523 13.7095 86.4152 14.6345C85.893 15.5596 85.1768 16.2832 84.2667 16.8054C83.3715 17.3126 82.357 17.5663 81.2231 17.5663ZM74.1063 17.3872V0.781494H77.5976V7.78634L77.3738 11.3447L77.4409 14.9255V17.3872H74.1063ZM80.6188 14.7017C81.2007 14.7017 81.7154 14.5674 82.163 14.2988C82.6255 14.0303 82.9911 13.6498 83.2596 13.1575C83.5431 12.6502 83.6848 12.0534 83.6848 11.3671C83.6848 10.6659 83.5431 10.0691 83.2596 9.57671C82.9911 9.08436 82.6255 8.70391 82.163 8.43535C81.7154 8.16679 81.2007 8.03252 80.6188 8.03252C80.0369 8.03252 79.5148 8.16679 79.0522 8.43535C78.5897 8.70391 78.2242 9.08436 77.9556 9.57671C77.6871 10.0691 77.5528 10.6659 77.5528 11.3671C77.5528 12.0534 77.6871 12.6502 77.9556 13.1575C78.2242 13.6498 78.5897 14.0303 79.0522 14.2988C79.5148 14.5674 80.0369 14.7017 80.6188 14.7017Z"
                            fill="white"/>
                    </svg>
                </Link>
            </div>
            <div
                className="pl-5 pr-36 py-4  rounded-lg border border-white justify-start items-center inline-flex">
                <div className="text-white text-base font-normal">Search Talent, Job, Projects</div>
            </div>
            <div className="justify-start items-center gap-6 inline-flex">
                <div className="text-white text-base font-normal">
                    <Link href='/post-job'>
                        Create job
                    </Link>
                </div>
                <div className="text-white text-base font-normal">Find Talent</div>
                <div className="text-white text-base font-normal">
                    <a href="https://goerli.etherscan.io/address/0x02d75bfac9628eaf0a620a7b8d79031b2978e85a#writeContract" target={"_blank"}>
                    Contracts
                    </a>
                </div>
                {/*<div className="text-white text-base font-bold">*/}
                    <ConnectButton className="text-white text-2xl font-bold"/>
                {/*</div>*/}
            </div>

        </div>
    </>)
}