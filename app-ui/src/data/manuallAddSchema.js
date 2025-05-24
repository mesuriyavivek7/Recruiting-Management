import { duration } from '@mui/material'
import {z} from 'zod'


export const formSchema = z.object({
    candidate_name:z.string().min(1,'candidate name is required.'),
    mobile_no:z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    email:z.string().email("Invalid email address"),
    current_city:z.string().min(1,'Current city is required.'),
    prefered_locations:z.array(z.string().min(1)).min(1,"Select at least one prefered location"),
    total_experience:z.string().min(1,'Total experience is required.'),
    notice_period:z.string().min(1,'notice period is required.'),
    currency:z.string().min(1,'currency is required.'),
    duration:z.string().min(1,"duration is required."),
    current_salary:z.coerce.number({invalid_type_error:'Salary must be a number'}).positive("Salary must be a positive number."),
    hike:z.coerce.number({invalid_type_error:'Hike must be a number'}),
    expected_salary:z.coerce.number({invalid_type_error:'expected salary must be a number'}).positive("Expected salary must be a positive number."),
    key_skills:z.array(z.string().min(1)).min(1,"Add at least one skill."),
    may_also_know:z.array(z.string().min(1)).min(1,'Add at least one skill.'),
    labels:z.array(z.string()).optional(),
    pancard:z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format").min(1, "PAN card is required"),
    aadharcard:z.string().regex(/^\d{12}$/, "Aadhar card must be a 12-digit number").or(z.literal('')).optional(),
    experience:z.array(z.object({company:z.string().min(1,"Company name is required."),title:z.string().min(1,"Title is required."),from_date:z.string().optional(),to:z.string().optional()})),
    academic_details:z.array(z.object({education:z.string().min(1,"Education details is required."),college:z.string().min(1,'College name is required'),pass_year:z.coerce.number().optional()})),
    naukri_profile:z.string().url('Must be valid url').optional().or(z.literal('')),
    linkedin_profile:z.string().url('Must be valid url').optional().or(z.literal('')),
    portfolio_link:z.string().url('Must be valid url').optional().or(z.literal('')),
    source:z.string().optional(),
    alternate_phone_number:z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits").or(z.literal('')).optional(),
    last_working_date:z.string().optional(),
    gender:z.string().optional(),
    age:z.coerce.number().optional(),
    is_tier_one_mba_college:z.string().optional(),
    is_tier_one_engineering_college:z.string().optional(),
    comment:z.string().optional(),
    exit_reason:z.string().optional()
})