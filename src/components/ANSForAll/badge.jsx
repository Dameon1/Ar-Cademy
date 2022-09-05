import * as React from 'react';


import { useAns } from '../';

import * as lang from '../en.json';

export const Default_Badge = () => {

    //will replace later
    const connector = lang.connector;

    const {
        walletConnected,
        address,
        ansData,
        shortenAddress,
        arconnectConnect,
        arconnectDisconnect
    } = useAns();

    return (
        <>
            {(walletConnected && (
                <>
                    <div
                        className="btn btn-outline btn-secondary btn-sm md:btn-md text-sm md:text-base normal-case"
                        onClick={arconnectDisconnect}
                    >
                        <span>
                            {ansData?.currentLabel ? `${ansData?.currentLabel}.ar` : shortenAddress(address)}
                        </span>
                        {(ansData?.avatar === "") ?
                            <div className="mx-auto rounded-full h-6 w-6 ml-2 btn-secondary border-[1px]" style={{ backgroundColor: ansData?.address_color }}></div> :
                            <div className="mx-auto rounded-full h-6 w-6 overflow-hidden ml-2 btn-secondary border-[1px]" style={{ backgroundColor: ansData?.address_color }}>
                                <img src={`https://arweave.net/${ansData?.avatar}`} alt="Profile" width="100%" height="100%" />
                            </div>}

                    </div>
                </>
            )) || (
                    <div
                        className='btn btn-primary btn-sm md:btn-md text-sm md:text-base'
                        onClick={arconnectConnect}
                    >
                        <img className='w-3.5 h-3.5 mr-3.5 md:w-4 md:h-4 md:mr-4' src="https://nanofuxion.ar.page/favicon.png"></img> {(connector.login)}
                    </div>
                )}
        </>
    )
}