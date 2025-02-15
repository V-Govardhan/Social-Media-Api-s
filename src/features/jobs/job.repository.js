// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
import { jobSchema } from "./schema/newJob.schema.js";
import { applyJobSchema } from "./schema/applyJob.schema.js";

const JobModel =mongoose.model('Job', jobSchema);
const ApplicantsModel = mongoose.model('Jobapplicant', applyJobSchema);

export const createNewJob = async (job) => {
  // Write your code here
  try{
    const newJob =new JobModel(job);
    await newJob.save();
    return newJob
  }catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
  
};

export const applyJobRepo = async (jobId, userId) => {
  // Write your code here
  try{
    const findJob = await JobModel.findById(jobId);
    const reapply = findJob.applicants.includes(userId)
    console.log(reapply)
    if(findJob && !reapply){
      //creating a new application
    const jobIdObj= new mongoose.Types.ObjectId(jobId)
    const userIdObj = new mongoose.Types.ObjectId(userId)
    const applyJob = new ApplicantsModel({jobId: jobIdObj, userId: userIdObj});
    await applyJob.save();


    findJob.applicants.push(userId);
    await findJob.save();
    return findJob
    }
    

  }catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
export const findJobRepo = async (_id) => {
  // Write your code here
  try{
    const checkJob = await JobModel.findById(_id);
    console.log(check)
    return checkJob
  }catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
