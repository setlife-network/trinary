import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import { Icon } from '@material-ui/core'

import AddContributorList from '../components/AddContributorList'
import CreatePaymentFloatingBadge from '../components/CreatePaymentFloatingBadge'
import OpenInGithubButton from '../components/OpenInGithubButton'
import Overlay from '../components/Overlay'
import Section from '../components/Section'
import SendBonus from '../components/SendBonus'

import { GET_PROJECT } from '../operations/queries/ProjectQueries'

import { getHandle, selectCurrencyInformation } from '../scripts/selectors'

import { sessionUser } from '../reactivities/variables'

const ProjectDetailPage = (props) => {

    const { projectId } = useParams()
    const history = useHistory()

    const [openBonusesOverlay, setOpenBonusesOverlay] = useState(false)
    const [openAddContributorOverlay, setOpenAddContributorOverlay] = useState(false)
    const [screenIndex, setScreenIndex] = useState(0)

    const {
        data: dataProject,
        loading: loadingProject,
        error: errorProject,
    } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(projectId)
        }
    })

    useEffect(() => {
        if (!openBonusesOverlay && !screenIndex) {
            setScreenIndex(0)
        }
    }, [openBonusesOverlay])

    if (loadingProject) return ('Loading...')

    if (errorProject) return (`${errorProject}`)

    const project = dataProject.getProjectById

    const renderContributors = (contributors) => {
        return contributors.map(contributor => {
            return (
                <div className='contributor w-14'>
                    <div className='rounded-full h-14 w-14 bg-light text-4xl text-center'>
                        <Icon className='icon fas fa-user text-gray text-center w-full h-full mt-2.5' fontSize='inherit'/>
                    </div>
                    <div className='w-18 mt-2'>
                        <p className='text-center text-ellipsis overflow-hidden word-break'>{contributor.name}</p>
                    </div>
                </div>
            )
        })
    }

    const renderPayments = (payments) => {
        return payments.map(payment => {
            return (
                <div className='payment bg-white-light rounded-lg p-4 grid grid-flow-row auto-rows-max'>
                    <div className='flex grid grid-cols-2 gap-4 '>
                        <div className='text-left'>
                            {payment.contributor &&
                                <>
                                    <p className='text-xl font-bold'>
                                        {payment.contributor.name}
                                    </p>
                                    <p>
                                        {`@${getHandle(payment.contributor.github_handle)}`}
                                    </p>
                                </>
                            }
                        </div>
                        <div>
                            <p className='text-xl font-bold text-right'>
                                {`${selectCurrencyInformation({ currency: payment.currency }).symbol} ${payment.amount}`}
                            </p>
                        </div>
                    </div>
                    <button type='button' className='text-right w-fit ml-auto' onClick={() => history.push(`/payments/edit/${payment.id}`)}>
                        <Icon className='fas fa-pen text-gray' fontSize='small'/>
                    </button>
                </div>
            )
        })
    }

    return (
        <div className='ProjectDetailPage mb-10'>
            <button type='button' className='w-fit' onClick={() => history.push('/dashboard')}>
                <Icon className='fas fa-arrow-left px-12 sm:px-24 md:px-48 lg:px-96 pt-2 pb-6'/>
            </button>
            <Section backgroundColor='bg-white-light' className='rounded-b-lg'>
                <p className='font-bold text-xl mb-4'>
                    Overview
                </p>
                <div className='project-general rounded-lg bg-white p-4 mb-4'>
                    <div className='flex gap-4 grid grid-flow-col auto-cols-max"'>
                        <div className='flex gap-4'>
                            <div className='bg-light rounded-full h-12 w-12 '>
                                <div className='h-fit m-auto'>
                                    <p className='font-bold text-center text-3xl align-middle w-fit m-auto leading-10 mt-1'>
                                        {project.name.charAt(0).toUpperCase()}
                                    </p>
                                </div>
                            </div>
                            <div className='h-fit my-auto'>
                                <p className='font-bold m-auto leading-loose'>
                                    {project.name}
                                </p>
                            </div>
                        </div>
                        <div className='justify-self-end mt-auto'>
                            <p>
                                {project.expected_budget_currency}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-4 mb-8'>
                    {project.expected_budget && 
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p>Expected Budget</p>
                            </div>
                            <div>
                                <p className='text-right font-bold'>{`${project.expected_budget_currency ?? '$'} ${project.expected_budget}`}</p>
                            </div>
                        </div>
                    }
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <p>Total paid</p>
                        </div>
                        <div>
                            <p className='text-right font-bold'>{`${project.expected_budget_currency ?? '$'} ${project.totalPaid ?? 0}`}</p>
                        </div>
                    </div>
                    {project.date && 
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p className='font-bold'>Start date</p>
                            </div>
                            <div className='text-right'>{`${moment(project.date, 'x').format('YYYY-MM-DD')}`}</div>
                        </div>
                    }
                    {project.end_date &&
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p className='font-bold'>End date</p>
                            </div>
                            <div className='text-right'>{`${moment(project.end_date, 'x').format('YYYY-MM-DD')}`}</div>
                        </div>
                    }
                </div>
                <button
                    type='button'
                    className='bg-setlife w-full rounded-full py-2 mb-4'
                    onClick={() => window.open('https://www.figma.com/proto/qgGWXmprU7vTv7guzWzvML/Project-Trinary?node-id=4830%3A20523&scaling=scale-down&page-id=4076%3A12706&starting-point-node-id=4830%3A20523&show-proto-sidebar=1', '_blank')}
                >
                    <div className='flex gap-2 m-auto text-center w-fit'>
                        <Icon className='icon far fa-money-bill-alt text-white w-fit' fontSize=''/>
                        <p className='text-white'>Fund project</p>
                    </div>
                </button>
                <OpenInGithubButton url={project.github_url}/>
            </Section>
            <Section>
                <div className='grid grid-rows-1 grid-cols-2'>
                    <div>
                        <p className='font-bold text-xl mb-4'>
                            Active Contributors
                        </p>
                    </div>
                    {sessionUser().wallet && sessionUser().wallet.invoice_macaroon && sessionUser().github_handle.split('/')[3] == 'otech47' &&
                        <button
                            type='button'
                            className='border-2 border-setlife text-setlife rounded-full py-1 mb-4 w-fit h-fit px-2 ml-auto'
                            onClick={() => setOpenBonusesOverlay(true)}
                        >
                            Send bonuses
                        </button>
                    }
                </div>
                <div className='flex gap-4 overflow-x-scroll'>
                    {renderContributors(project.contributors)}
                    {!project.contributors.length &&
                        <p className='text-center w-full'>
                            No active contributors at the moment
                        </p>
                    }
                </div>
                <div className='px-12 mt-8'>
                    <button
                        type='button'
                        className='border-2 border-setlife w-full rounded-full py-1'
                        onClick={() => setOpenAddContributorOverlay(true)}
                    >
                        <div className='flex gap-2 m-auto text-center w-fit'>
                            <p className='text-setlife'>Add new contributor</p>
                        </div>
                    </button>
                </div>
                
            </Section>
            <Section>
                <p className='font-bold text-xl mb-2'>
                    Issues
                </p>
                <div className='rounded-lg bg-white-light p-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <p>Active</p>
                        </div>
                        <div>
                            <p className='font-bold text-right'>{project.githubIssuesOpened}</p>
                        </div>
                        <div>
                            <p>Closed</p>
                        </div>
                        <div>
                            <p className='font-bold text-right'>{project.githubIssuesClosed}</p>
                        </div>
                    </div>
                    <div className='my-4'>
                        <p className='font-bold text-xl'>Pull request</p>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <p>Open</p>
                        </div>
                        <div>
                            <p className='font-bold text-right'>{project.githubPullRequestsOpened}</p>
                        </div>
                        <div>
                            <p>Merged</p>
                        </div>
                        <div>
                            <p className='font-bold text-right'>{project.githubPullRequestsMerged}</p>
                        </div>
                        <div>
                            <p>Closed</p>
                        </div>
                        <div>
                            <p className='font-bold text-right'>{project.githubPullRequestsClosed}</p>
                        </div>
                    </div>
                </div>
            </Section>
            <OpenInGithubButton url={`${project.github_url}/pulls`}/>
            <Section>
                <p className='font-bold text-xl mb-2'>
                    Payments
                </p>
                <div className='grid gap-4'>
                    {renderPayments(project.payments)}
                </div>
            </Section>
            <CreatePaymentFloatingBadge projectId={projectId} />
            <Overlay
                open={openBonusesOverlay}
                setOpen={setOpenBonusesOverlay}
                fullScreen
                goBackAction={screenIndex == 0 ? false : () => setScreenIndex(screenIndex - 1)}
            >
                <SendBonus
                    project={project}
                    setOpen={setOpenBonusesOverlay}
                    screenIndex={screenIndex}
                    setScreenIndex={setScreenIndex}
                />
            </Overlay>
            <Overlay
                open={openAddContributorOverlay}
                setOpen={setOpenAddContributorOverlay}
                fullScreen
            >
                <AddContributorList
                    projectId={projectId}
                />
            </Overlay>
        </div>
    )
}

export default ProjectDetailPage