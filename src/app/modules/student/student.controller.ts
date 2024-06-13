import { Request, Response } from 'express';
import { StudentServices } from './student.services';
import Joi from 'joi';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // creating a schema validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    const zodParseData = studentValidationSchema.parse(studentData);

    // will call service function here
    const result = await StudentServices.createStudentIntoDB(zodParseData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something is wrong.',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully.',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong.',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'All students are retrieved successfully.',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong.',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully.',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong.',
      error: err,
    });
  }
};
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
