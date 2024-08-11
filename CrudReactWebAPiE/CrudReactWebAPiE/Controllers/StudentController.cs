using CrudReactWebAPiE.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CrudReactWebAPiE.Controllers
{
    public class StudentController : ApiController
    {
        StudenstDbEntities db = new StudenstDbEntities();

        [Route("api/Student/AddStudent")]
        [HttpPost]
        public Response AddStudent(StudentModel studentModel)
        {
            Response response = new Response();

            try
            {
                if (studentModel.Type == "Add")
                {
                    Student student = new Student
                    {
                        FullName = studentModel.FullName,
                        SchoolNumber = studentModel.SchoolNumber,
                        WhichClass = studentModel.WhichClass,
                        Gender = studentModel.Gender
                    };

                    db.Students.Add(student);
                    db.SaveChanges();

                    response.ResponseCode = "200";
                    response.ResponseMessage = "Student Added";
                }
                else if (studentModel.Type == "Update")
                {
                    var student = db.Students.FirstOrDefault(s => s.SchoolNumber == studentModel.SchoolNumber);
                    if (student != null)
                    {
                        student.FullName = studentModel.FullName;
                        student.WhichClass = studentModel.WhichClass;
                        student.Gender = studentModel.Gender;

                        db.Entry(student).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();

                        response.ResponseCode = "200";
                        response.ResponseMessage = "Student Updated";
                    }
                    else
                    {
                        response.ResponseCode = "404";
                        response.ResponseMessage = "Student Not Found";
                    }
                }
                else if (studentModel.Type == "Delete")
                {
                    var student = db.Students.FirstOrDefault(s => s.SchoolNumber == studentModel.SchoolNumber);
                    if (student != null)
                    {
                        db.Entry(student).State = System.Data.Entity.EntityState.Deleted;
                        db.SaveChanges();

                        response.ResponseCode = "200";
                        response.ResponseMessage = "Student Deleted";
                    }
                    else
                    {
                        response.ResponseCode = "404";
                        response.ResponseMessage = "Student Not Found";
                    }
                }
                else
                {
                    response.ResponseCode = "400";
                    response.ResponseMessage = "Invalid Operation Type";
                }
            }
            catch (DbUpdateConcurrencyException ex)
            {
                response.ResponseCode = "409";
                response.ResponseMessage = "Concurrency conflict occurred. Please try again.";
            }
            catch (Exception ex)
            {
                response.ResponseCode = "500";
                response.ResponseMessage = "Some error occurred: " + ex.Message;
            }

            return response;
        }

        [Route("api/Student/GetStudents")]
        [HttpGet]
        public Response GetStudents()
        {
            Response response = new Response();
            List<Student> lstStudents = db.Students.ToList();
            response.ResponseCode = "200";
            response.ResponseMessage = "Data fetched";
            response.lstStudents = lstStudents;

            return response;
        }

        [Route("api/Student/StudentById")]
        [HttpPost]
        public Response StudentById(StudentModel studentModel)
        {
            Response response = new Response();
            if (studentModel != null)
            {
                Student student = db.Students.FirstOrDefault(x => x.SchoolNumber == studentModel.SchoolNumber);
                response.student = student;
                response.ResponseCode = "200";
                response.ResponseMessage = "Student found";
            }
            else
            {
                response.ResponseCode = "400";
                response.ResponseMessage = "Invalid input";
            }
            return response;
        }
    }
}
