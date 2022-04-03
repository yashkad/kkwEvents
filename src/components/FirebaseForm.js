import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../App";
import EventsService from "../service/events.service";
import ImageService from "../service/Image.service";
//
import { v4 as uuid } from "uuid";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  uploadBytesResumable,
} from "firebase/storage";
//

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const arr = ["MCA", "MBA", "IT", "CS", "ENTC"];
  const [department, setDepartment] = useState(arr[0]);

  const [date, setDate] = useState("");
  const [totalStud, setTotalStud] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  const [message, setMessage] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState({ id: "" });
  const [list, setList] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(null);
  // image
  const [img, setImg] = useState("");
  const [file, setFile] = useState("");
  const acceptFormat = ["image/png", "image/jpeg"];

  const user = useContext(EventContext);

  useEffect(() => {
    getAllEvents();
    console.log("COntext : ", user);
  }, []);

  useEffect(() => {
    if (loading) {
      getAllEvents();
    }
  }, [loading]);

  const getAllEvents = async () => {
    const data = await EventsService.getAllEvents();
    // console.log("Data : ", data.docs);
    setList(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    // console.log("List : ", list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      topic === "" ||
      email === "" ||
      date === "" ||
      totalStud === "" ||
      uploadedUrl === ""
    ) {
      setMessage({ error: true, msg: "All fields are compulsory" });
      return;
    }

    if (edit?.id) {
      handleUpdate(edit.id);
      return;
    }

    setMessage("");

    const data = {
      name,
      topic,
      department,
      email,
      totalStud,
      date,
      url: uploadedUrl,
    };
    setLoading(true);
    try {
      await EventsService.addEvent(data);
      resetFormFields();
      setMessage({ error: false, msg: "successfully submitted" });
      setLoading(false);
    } catch (e) {
      return e;
    }
    console.log(data);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await EventsService.deleteEvent(id);
      setLoading(false);
      setMessage({ error: false, msg: "Deleted successfully" });
    } catch (e) {
      return e;
    }
  };

  const handleUpdate = async (id) => {
    setEdit("");
    setLoading(true);

    const data = {
      name,
      topic,
      department,
      email,
      totalStud,
      date,
    };

    await EventsService.updateEvent(id, data);
    setMessage({ error: false, msg: "Edited successfully" });
    setLoading(false);
    resetFormFields();
  };

  const handleEdit = (item) => {
    const { name, department, topic, id, email, date, totalStud } = item;
    setName(name);
    setDepartment(department);
    setTopic(topic);
    setEmail(email);
    setDate(date);
    setTotalStud(totalStud);
  };

  const resetFormFields = () => {
    setName("");
    setDepartment(arr[0]);
    setTopic("");
    setEmail("");
    setDate("");
    setImg(null);
    setTotalStud("");
  };

  //   image handlers
  const onChangeHandler = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    const files = e.target.files;
    if (acceptFormat.includes(files[0].type)) {
      setFile(files);
    }
  };

  // const handleUpload = async () => {
  //   setLoading(true);
  //   try {
  //     await ImageService.uploadImage(file, department);
  //     setLoading(false);
  //     setMessage({ error: false, msg: "Image uploaded succussfull" });
  //   } catch (e) {
  //     return e;
  //   }
  // };

  const handleUpload = async (_, folderName) => {
    const storage = getStorage();
    setLoading(true);
    const name = `/${folderName ? folderName : "posts"}/${uuid()}`;

    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);
    // const [imgUrl, setImgUrl] = useState("");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("File uploaded : ", snapshot);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoadingPercentage(progress);
      },
      (e) => {
        console.log(e);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setUploadedUrl(url);
          setLoading(false);
          setLoadingPercentage(null);
        });
      }
    );
  };

  return (
    <div
      className="main block mt-5 mb-5 container has-text-left container-fluid"
      style={{ maxWidth: 600 }}
    >
      {message?.msg && (
        <article
          className={`message is-${message?.error ? "danger" : "success"}`}
        >
          <div className="message-header">
            <p>{message?.error ? "oh no " : "successfull"}</p>
            <button
              className="delete"
              aria-label="delete"
              onClick={() => setMessage("")}
            ></button>
          </div>
          <div className="message-body">{message?.msg}</div>
        </article>
      )}
      {loading && (
        <progress
          className="progress is-small is-primary"
          value={loadingPercentage ? loadingPercentage : null}
          max="100"
        >
          15%
        </progress>
      )}

      {img && (
        <div className="box block box-color ">
          <figure className="image is-2by1 ">
            <img id="myimg" src={img} className="" alt="Image" />
          </figure>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Guest Name</label>
          <div className="control">
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name of the guest"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              required
              name="from"
              className="input"
              type="email"
              placeholder="Enter email to invite"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          {/* <p className="help">To send invitation enter email</p> */}
        </div>

        <div className="field">
          <label className="label">Topic</label>
          <div className="control">
            <input
              className="input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              type="text"
              placeholder="Enter Subject name"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Department</label>
          <div className="control">
            <div className="select">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {arr.map((i) => (
                  <option>{i}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Date</label>
          <div className="control">
            <input
              required
              name="date"
              className="input"
              type="date"
              placeholder="Select Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* <p className="help">This is a help text</p> */}
        </div>

        <div className="field">
          <label className="label">Total students enrolled</label>
          <div className="control">
            <input
              className="input"
              value={totalStud}
              onChange={(e) => setTotalStud(e.target.value)}
              type="number"
              placeholder="how many students enrolled?"
            />
          </div>
        </div>
        {/*  */}
        <div className="file is-success is-justify-content-center p-5 ">
          <label className="file-label ">
            <input
              className="file-input"
              type="file"
              accept="image/*"
              name="resume"
              onChange={onChangeHandler}
              required
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
            {file && (
              <span className="file-name has-text-primary-dark">
                {file[0].name}
              </span>
            )}
          </label>
        </div>

        {img && (
          <button type="button" className="button m-5" onClick={handleUpload}>
            upload Image
          </button>
        )}
        {/*  */}
        <div className="field">
          <p className="control">
            <button type="submit" className="button is-success">
              {edit.id ? "Edit" : "Submit"}
            </button>
          </p>
        </div>
      </form>

      <table className="table mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Topic</th>
            <th>Date</th>
            <th>Enrollement</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={index + ""}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.department}</td>
                <td>{item.topic}</td>
                <td>{item.date}</td>
                <td>{item.totalStud}</td>
                <td className="buttons are-normal">
                  <div
                    className="button   is-warning is-light "
                    onClick={(e) => {
                      handleEdit(item);
                      setEdit({ id: item.id });
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="button   is-danger is-light is-small"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(list, undefined, 1)}</pre> */}
    </div>
  );
};

export default Form;
