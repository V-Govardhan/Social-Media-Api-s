// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";

const LikeModel = mongoose.model('Like', likeSchema)

export const likeRepo = async (user_id, id, model) => {
  // Write your code here
  try{
    const like = new LikeModel({
      user: new mongoose.Types.ObjectId(user_id),
      likeable: new mongoose.Types.ObjectId(id),
      on_model: model,
    })
    await like.save()
    return like

  }catch(error){
    return{
      success: false,
      error:{statusCode: 400, msg: error}
    }
  }

};
export const getLikesRepo = async (jobId, model) => {
  // Write your code here
  try{
    // const findLike = await LikeModel.find({likeable:id, on_model:on_model}).populate('User')
    // return findLike
    const likesDetails = await LikeModel.find({
			likeable: jobId,
			on_model: model, 
		}).select("-on_model")
			.populate({
				path: "user", 
				select: "-password",
			})
			.populate("likeable"); 
		return likesDetails;
  }catch(error){
    console.log(error)
    return{
      success: false,
      error:{statusCode: 400, msg: error}
    }
  }

};
