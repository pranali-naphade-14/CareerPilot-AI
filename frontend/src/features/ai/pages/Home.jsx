import React,{useState,useRef} from 'react';
import '../style/home.scss'
import { useInterview } from '../hooks/useinterview';
import {useNavigate} from "react-router"


const Home = () => {
  const {loading, generateReport, reports}= useInterview()
  const [jobDescription,setJobDescription]=useState("")
  const [selfDescription,setselfDescription]=useState("")
  const resumeInputRef=useRef()

  const navigate=useNavigate()

  const handleGenerateReport = async()=>{
    const resumeFile=resumeInputRef.current.files[0]
    const data=await generateReport({jobDescription, selfDescription, resumeFile})
    navigate(`/interview/${data._id}`)
  }

  if(loading){
    return(
      <main className='loading-screen'>
          <h1>Loading your interview plan...</h1>
      </main>
    )
  }

  return (
    <main className='home'>

      {/* Header Section */}
      <section className='home-header'>

        <h1>
          Create Your Custom
          <span> Interview Plan</span>
        </h1>

        <p>
          Let our AI analyze the job requirements and your unique profile
          to build a winning strategy.
        </p>

        <div className='header-dot'></div>

      </section>


      {/* Main Interview Form Card */}
      <section className='interview-card'>

        <div className='interview-content'>

          {/* LEFT SECTION */}
          <div className='left'>

            <div className='section-title'>

              <h2>
                <span className='title-icon'>▣</span>
                Target Job Description
              </h2>

              <span className='required-badge'>
                Required
              </span>

            </div>

            <textarea
              onChange={(e)=>{setJobDescription(e.target.value)}}
              name="jobDescription"
              id="jobDescription"
              placeholder="Paste the full job description here...
e.g. Senior Frontend Engineer at Google requires
proficiency in React, TypeScript, and large-scale system
design..."
            />

            <div className='character-count'>
              0 / 5000 chars
            </div>

          </div>


          {/* RIGHT SECTION */}
          <div className='right'>

            <div className='section-title'>

              <h2>
                <span className='title-icon'>♟</span>
                Your Profile
              </h2>

            </div>


            {/* Resume Upload */}
            <div className='input-group'>

              <label htmlFor='resume'>
                Upload Resume
                <span className='best-result'>
                  Best Results
                </span>
              </label>

              <div className='resume-upload'>

                <input
                  ref={resumeInputRef}
                  type='file'
                  name="resume"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                />

                <div className='upload-icon'>
                  ↑
                </div>

                <p>
                  Click to upload or drag & drop
                </p>

                <span>
                  PDF or DOCX (Max 5MB)
                </span>

              </div>

            </div>


            {/* OR Divider */}
            <div className='or-divider'>
              <span>OR</span>
            </div>


            {/* Self Description */}
            <div className='input-group'>

              <label htmlFor='selfDescription'>
                Quick Self-Description
              </label>

              <textarea
                onChange={(e)=>{setselfDescription(e.target.value)}}
                name="selfDescription"
                id="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of
experience if you don't have a resume handy..."
              />

            </div>


            {/* Information Box */}
            <div className='info-box'>

              <span>ⓘ</span>

              <p>
                Either a Resume or a Self Description is required
                to generate a personalized plan.
              </p>

            </div>

          </div>

        </div>


        {/* Card Footer */}
        <div className='card-footer'>

          <span>
            AI-Powered Strategy Generation • Approx 30s
          </span>

          <button onClick={handleGenerateReport} className='generate-btn'>
            ✨ Generate My Interview Strategy
          </button>

        </div>

      </section>

      {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

      {/* Bottom Links */}
      <footer className='home-footer'>

        <a href='#'>Privacy Policy</a>

        <a href='#'>Terms of Service</a>

        <a href='#'>Help Center</a>

      </footer>

    </main>
  )
}



export default Home
