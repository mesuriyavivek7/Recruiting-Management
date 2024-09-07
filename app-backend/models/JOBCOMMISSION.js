import mongoose from "mongoose";


const jobcommissionSchema=new mongoose.Schema({
    enterprise_id:{
        type:String,
        required:true
    },
    job_id:{
        type:String,
        required:true
    },
    work_type:{
        type:String,
        required:true
    },
    work_details:{
        full_time:{
            full_time_salary_type:String,
            full_time_salary_currency:String,

             additional_salary_details:String,
             min_salary:String,
             max_salary:String,
             fixed_salary:String
        },
        contract:{
            contract_duration_type:String,
            contract_duration_count:String,
            contract_pay_rate_type:String,
            contract_pay_currency:String,
            min_contract_pay:String,
            max_contract_pay:String,
            fix_contract_pay:String,
            contract_pay_cycle:String,
            additional_contract_details:String,
            weekly_hour_cnt:Number,
            daily_hour_cnt:Number,
            remarks:String
        }
    },
    commission_details:{
        commission_type:String,
        commission_fix_pay:String,
        commission_percentage_pay:String,
        payment_tearms:String,
        replacement_clause:String
    }
},{timestamps:true});

export default mongoose.model("jobcommission",jobcommissionSchema)