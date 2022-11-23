import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import { Icon } from '@material-ui/core'

import CreatePaymentFloatingBadge from '../components/CreatePaymentFloatingBadge'
import OpenInGithubButton from '../components/OpenInGithubButton'
import Section from '../components/Section'

import { GET_PROJECT } from '../operations/queries/ProjectQueries'

const ProjectDetailPage = (props) => {

    const { projectId } = useParams()

    const {
        data: dataProject,
        loading: loadingProject,
        error: errorProject,
    } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(projectId)
        }
    })

    if (loadingProject) return ('Loading...')

    if (errorProject) return (`${errorProject}`)

    const project = dataProject.getProjectById

    const renderContributors = (contributors) => {
        return contributors.map(contributor => {
            return (
                <div className='contributor w-14'>
                    <div className='rounded-full h-14 w-14 bg-light text-4xl'>
                        <Icon className='icon fas fa-user text-grey text-center w-full h-full mt-2.5' fontSize='inherit'/>
                    </div>
                    <div className='w-full'>
                        <p className='text-center'>{contributor.name}</p>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='ProjectDetailPage mb-10'>
            <Section backgroundColor='bg-light' className='rounded-b-lg'>
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
                                <p className='text-right font-bold'>{`${project.expected_budget_currency} ${project.expected_budget}`}</p>
                            </div>
                        </div>
                    }
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <p>Total paid</p>
                        </div>
                        <div>
                            <p className='text-right font-bold'>{`${project.totalPaid}`}</p>
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
                <OpenInGithubButton/>
            </Section>
            <Section>
                <p className='font-bold text-xl mb-4'>
                    Active Contributors
                </p>
                <div className='flex gap-4 overflow-x-scroll'>
                    {renderContributors(project.contributors)}
                    {!project.contributors.length &&
                        <p className='text-center w-full'>
                            No active contributors at the moment
                        </p>
                    }
                </div>
            </Section>
            <Section>
                <p className='font-bold text-xl mb-4'>
                    Issues
                </p>
                <div className='rounded-lg bg-light p-4'>
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
            <CreatePaymentFloatingBadge projectId={projectId} />
        </div>
    )
}

export default ProjectDetailPage