import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'

import Section from '../components/Section'
import WalletOption from '../components/WalletOption'
import { WALLET_OPTIONS } from '../constants'

import { sessionUser } from '../reactivities/variables'

import { GET_CONTRIBUTOR_WALLETS } from '../operations/queries/ContributorQueries'

const WalletSetupPage = () => {

    const {
        data: dataContributorWallets,
        loading: loadingContributorWallets,
        error: errorContributorWallets
    } = useQuery(GET_CONTRIBUTOR_WALLETS, {
        variables: {
            id: Number(sessionUser().id)
        }
    })

    const renderWalletOptions = () => {
        const contributorWallets = dataContributorWallets.getContributorById.wallet
        
        return WALLET_OPTIONS.map((w, i) => {

            const isCompleted = contributorWallets ? (contributorWallets[w.attribute] != null && contributorWallets[w.attribute] != '') : false
            return (
                <WalletOption
                    icon={w.icon}
                    title={w.title}
                    subtitle={w.subtitle}
                    route={w.route}
                    count={i}
                    disabled={w.disabled}
                    completed={isCompleted}
                />
            )
        })
    }

    if (!dataContributorWallets) { return ('Loading...') }

    return (
        <div className='WalletSetupPage bg-med-gray h-full min-h-screen'>
            <Section>
                <p className='text-3xl font-bold mb-2'>
                    {'Choose one option'}
                </p>
                <p className='text-sm mb-7'>
                    {'Choose one of this three options and set up your wallet'}
                </p>
                {renderWalletOptions()}
            </Section>
        </div>
    )
}

export default WalletSetupPage