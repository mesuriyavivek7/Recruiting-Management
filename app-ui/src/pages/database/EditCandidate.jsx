import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ManuallAdd from '../../components/database/ManuallAdd'
import { toast } from 'react-toastify'

const monthToNumber = (monthName) => {
  const months = {
    january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
    july: '07', august: '08', september: '09', october: '10', november: '11', december: '12'
  }
  return months[`${monthName}`.toLowerCase()] || ''
}

const toYearMonth = (input) => {
  if (!input) return ''
  const m = /([A-Za-z]+)\s+(\d{4})/.exec(input)
  if (m) {
    const month = monthToNumber(m[1])
    const year = m[2]
    if (month && year) return `${year}-${month}`
  }
  const m2 = /(\d{4})-(\d{2})/.exec(input)
  if (m2) return input
  return ''
}

const extractYear = (input) => {
  if (!input) return ''
  const m = /(19|20)\d{2}/.exec(`${input}`)
  return m ? m[0] : ''
}

const normalize = (v, fallback = '') => (v === null || v === undefined ? fallback : v)

const mapCandidateToForm = (candidate) => {
  if (!candidate) return null
  const cd = candidate.contact_details || {}
  return {
    candidate_name: normalize(cd.name),
    mobile_no: normalize(cd.phone),
    email: normalize(cd.email),
    current_city: normalize(cd.current_city),
    prefered_locations: Array.isArray(cd.looking_for_jobs_in) ? cd.looking_for_jobs_in.filter(Boolean) : [],
    total_experience: normalize(candidate.total_experience),
    notice_period: normalize(candidate.notice_period),
    currency: normalize(candidate.currency, 'INR (Lacs)'),
    duration: normalize(candidate.pay_duration, 'Yearly'),
    current_salary: normalize(candidate.current_salary, '0.00'),
    hike: normalize(candidate.hike, '0'),
    expected_salary: normalize(candidate.expected_salary, '0.00'),
    key_skills: Array.isArray(candidate.skills) ? candidate.skills.filter(Boolean) : [],
    may_also_know: Array.isArray(candidate.may_also_known_skills) ? candidate.may_also_known_skills.filter(Boolean) : [],
    labels: Array.isArray(candidate.labels) ? candidate.labels.filter(Boolean) : [],
    experience: Array.isArray(candidate.experience) ? candidate.experience.map((e) => ({
      company: normalize(e.company),
      title: normalize(e.title),
      from_date: toYearMonth(e.from_date),
      to: toYearMonth(e.until || e.to),
    })) : [],
    academic_details: Array.isArray(candidate.academic_details) ? candidate.academic_details.map((a) => ({
      education: normalize(a.education),
      college: normalize(a.college),
      pass_year: extractYear(a.pass_year),
    })) : [],
    naukri_profile: normalize(cd.naukri_profile),
    linkedin_profile: normalize(cd.linkedin_profile),
    portfolio_link: normalize(cd.portfolio_link),
    source: normalize(candidate.source, 'By Recruiter'),
    alternate_phone_number: normalize(cd.alternative_phone),
    last_working_date: normalize(candidate.last_working_day),
    gender: normalize(cd.gender, 'Not Mentioned'),
    age: normalize(cd.age, 0),
    is_tier_one_mba_college: candidate.is_tier1_mba === null || candidate.is_tier1_mba === undefined ? 'No' : (candidate.is_tier1_mba ? 'Yes' : 'No'),
    is_tier_one_engineering_college: candidate.is_tier1_engineering === null || candidate.is_tier1_engineering === undefined ? 'No' : (candidate.is_tier1_engineering ? 'Yes' : 'No'),
    comment: normalize(candidate.comment),
    exit_reason: normalize(candidate.exit_reason),
  }
}

function EditCandidate() {
  const navigate = useNavigate()
  const location = useLocation()
  const candidate = location.state?.candidate

  useEffect(() => {
    if (!candidate) {
      navigate('/recruiter/searchresult')
    }
  }, [candidate])

  const initialValues = mapCandidateToForm(candidate)

  const handleEditSubmit = async (payload) => {
    // keep placeholder toast; API implemented in ManuallAdd
    console.log('Edit payload', payload)
    toast.success('Candidate updated')
  }

  return (
    <div className='px-10 pt-10 flex flex-col gap-4'>
      <div>
        <h1 className='text-3xl tracking-wide text-blue-600 font-bold'>Edit Candidate</h1>
      </div>
      <div className='w-full'>
        {initialValues && (
          <ManuallAdd
            initialValues={initialValues}
            submitLabel='Edit'
            hideResumeUpload={true}
          />
        )}
      </div>
    </div>
  )
}

export default EditCandidate
