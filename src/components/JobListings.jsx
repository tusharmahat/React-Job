import { useState, useEffect } from 'react'
import React from 'react'
import JobListing from './JobListing'
import Spinner from './Spinner'
const JobListings = ({ isHome = false }) => {
    // const jobListings = isHome ? jobs.slice(0, 3) : jobs;
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs"
            try {
                fetch(apiUrl).then(res => res.json()).then((data) => { setJobs(data) })
            } catch (error) {
                console.log("Error fetching data from the server", error)
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, []);
    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>

                {loading ? <Spinner loading={loading} /> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {jobs.map((job) => (
                    <JobListing key={job.id} job={job} />
                ))}                </div>}

            </div>
        </section >
    )
}

export default JobListings