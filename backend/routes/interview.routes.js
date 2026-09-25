const express=require("express")
const authMiddleware=require("../middlewares/auth.middleware")
const {generateInterviewReportController,getInterviewReportByIdController, generateResumePdfController,
    getAllInterviewReportsController
}=require("../controllers/interview.controller")
const upload=require("../middlewares/file.middleware")

const interviewRouter=express.Router()

interviewRouter.post("/",authMiddleware.authUser,
upload.single("resume"),
    generateInterviewReportController)

    

interviewRouter.get("/report/:interviewId",authMiddleware.authUser, getInterviewReportByIdController
 )

 interviewRouter.get(
    "/",
    authMiddleware.authUser,
    getAllInterviewReportsController
);

interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,generateResumePdfController)

module.exports=interviewRouter