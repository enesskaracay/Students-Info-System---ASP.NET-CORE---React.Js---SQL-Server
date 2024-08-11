import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [fullName, setfullName] = useState("");
  const [schoolNumber, setschoolNumber] = useState("");
  const [whichClass, setwhichClass] = useState("");
  const [gender, setgender] = useState("");
  const [students, setstudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const url = "https://localhost:44379/";



   

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !schoolNumber || !whichClass || !gender) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      return;
    }

    const data = {
      FullName: fullName,
      SchoolNumber: schoolNumber,
      WhichClass: whichClass,
      Gender: gender,
      Type: "Add"
    };

    axios
      .post(`${url}/api/Student/AddStudent`, data)
      .then((json) => {
        clear();
        getstudents();
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!fullName || !schoolNumber || !whichClass || !gender) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      return;
    }

    const data = {
      FullName: fullName,
      SchoolNumber: schoolNumber,
      WhichClass: whichClass,
      Gender: gender,
      Type: "Update"
    };

    axios
      .post(`${url}/api/Student/AddStudent`, data)
      .then((json) => {
        clear();
        getstudents();
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (schoolNumber) => {
    if (schoolNumber > 0 || schoolNumber == "") {
      const data = {
        SchoolNumber: schoolNumber,
        Type: "Delete"
      };

      axios
        .post(`${url}/api/Student/AddStudent`, data)
        .then((json) => {
          clear();
          getstudents();
          setErrorMessage("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEdit = (schoolNumber) => {
    if (schoolNumber > 0 || schoolNumber == "") {
      const data = {
        SchoolNumber: schoolNumber,
      };

      axios
        .post(`${url}/api/Student/StudentById`, data)
        .then((json) => {
          if (json) {
            setfullName(json.data.student.FullName);
            setschoolNumber(json.data.student.SchoolNumber);
            setwhichClass(json.data.student.WhichClass);
            setgender(json.data.student.Gender);
          }
          setErrorMessage("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getstudents = () => {
    axios
      .get(`${url}/api/Student/GetStudents`)
      .then((response) => {
        setstudents(response.data.lstStudents);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getstudents();
  }, []);

  const clear = () => {
    setfullName("");
    setschoolNumber("");
    setwhichClass("");
    setgender("");
  };

  return (
    <Fragment>
      <div className="container">
        
        <div className="app-container">
          <form>
            <label>Enter Full Name:</label>
            <input
              type="text"
              value={fullName}
              placeholder="Enter Full Name.."
              onChange={(e) => setfullName(e.target.value)}
            />
            <label>Enter School Number:</label>
            <input
              type="text"
              value={schoolNumber}
              placeholder="Enter School Number.."
              onChange={(e) => setschoolNumber(e.target.value)}
            />
            <label>Enter Which Class:</label>
            <input
              type="text"
              value={whichClass}
              placeholder="Enter Which Class.."
              onChange={(e) => setwhichClass(e.target.value)}
            />
            <label>Enter Gender:</label>
            <input
              type="text"
              value={gender}
              placeholder="Enter Gender.."
              onChange={(e) => setgender(e.target.value)}
            />


            <button type="submit" onClick={handleSubmit} className="button">SUBMİT</button>
            <br />
            <button type="button" onClick={handleUpdate} className="button">UPDATE</button>
          </form>
          {errorMessage && (
            <p style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>{errorMessage}</p>
          )}
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Serial no</th>
                <th>FullName</th>
                <th>SchoolNumber</th>
                <th>WhichClass</th>
                <th>Gender</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((stu, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{stu.FullName}</td>
                    <td>{stu.SchoolNumber}</td>
                    <td>{stu.WhichClass}</td>
                    <td>{stu.Gender}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(stu.SchoolNumber)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(stu.SchoolNumber)}
                        className="delete-button"
                      > 
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
