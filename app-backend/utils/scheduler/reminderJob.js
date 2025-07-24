import cron from 'node-cron'
import TASK from '../../models/TASK.js'
import { sendReminderEmail } from '../../controller/mailController.js'
import RECRUITINGTEAM from '../../models/RECRUITINGTEAM.js'


cron.schedule("* * * * *", async () =>{
    try{
    const now = new Date()

    const tasks = await TASK.find({scheduledTime: {$lte: now}, isCompleted:false})

    for (const task of tasks){
        const recruiter = await RECRUITINGTEAM.findById(task.recruiter_id)
        if(recruiter && recruiter.email){
            await sendReminderEmail(recruiter.email, task.task_details, task.candidate_name)
            task.isCompleted=true
            task.save()
        }
    }

    console.log(`Checked and sent ${tasks.length} reminder(s) at ${now}`);
    }catch(err){
        console.error("Cron job error:", err);
    } 
})