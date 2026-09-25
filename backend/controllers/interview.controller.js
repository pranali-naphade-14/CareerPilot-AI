const { PDFParse } = require("pdf-parse")
const {generateInterviewReport, generateResumePdf}=require("../services/ai.service")
const InterviewReportModel = require("../models/interviewReport.model.js")

async function generateInterviewReportController(req, res) {

    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await InterviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

async function getInterviewReportByIdController (req,res){
    const {interviewId}=req.params

    const interviewReport= await InterviewReportModel.findOne({_id:interviewId, user:req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }

    res.status(200).json({
        message:"interview report fetched successfully",
        interviewReport
    })
}

async function generateResumePdfController(req,res){
    const {interviewReportId}=req.params

    const interviewReport= await InterviewReportModel.findById(interviewReportId)

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found."
        })
    }

    const {resume, jobDescription, selfDescription}= interviewReport

    const pdfBuffer=await generateResumePdf({resume, jobDescription, selfDescription})

    res.set({
        "content-Type":"application/pdf",
        "Content-Disposition":`attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer )
}

async function getAllInterviewReportsController(req, res) {

    const interviewReports = await InterviewReportModel.find({
        user: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    });
}

module.exports={generateInterviewReportController,getInterviewReportByIdController, generateResumePdfController,
getAllInterviewReportsController    
}