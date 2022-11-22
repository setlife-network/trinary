import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import moment from 'moment'

import Section from '../components/Section'

import { GET_PROJECT } from '../operations/queries/ProjectQueries'

import { GITHUB_ALT_LOGO_URL } from '../constants'

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

    console.log('dataProject')
    console.log(dataProject)

    const project = dataProject.getProjectById

    return (
        <div className='ProjectDetailPage'>
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
                <a 
                    className='open-github bg-transparent rounded-full w-full' 
                    href={project.github_url}
                    target='_blank'
                    rel='noreferrer'
                >
                    <div className='grid grid-flow-col auto-cols-max px-8 py-2 justify-center gap-4'>
                        <div className=''>
                            <img src={GITHUB_ALT_LOGO_URL} alt={'GitHub'} className='h-6'/>
                        </div>
                        <div className=''>
                            <p className=''>
                                Open in GitHub
                            </p>
                        </div> 
                    </div>
                </a>
            </Section>
        </div>
    )
}

export default ProjectDetailPage