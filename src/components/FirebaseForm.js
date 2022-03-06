import React, { useEffect, useState } from "react";
import EventsService from "../service/events.service";
import ImageService from "../service/Image.service";
const Form = () => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const arr = ["MCA", "MBA", "IT", "CS", "ENTC"];
  const [department, setDepartment] = useState(arr[0]);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState({ id: "" });
  const [list, setList] = useState([]);
  // image
  const [img, setImg] = useState("");
  const [file, setFile] = useState("");
  const acceptFormat = ["image/png", "image/jpeg"];

  useEffect(() => {
    getAllEvents();
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
    console.log("List : ", list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || topic === "") {
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
    };

    await EventsService.updateEvent(id, data);
    setMessage({ error: false, msg: "Edited successfully" });
    setLoading(false);
    resetFormFields();
  };

  const handleEdit = (item) => {
    const { name, department, topic, id } = item;
    setName(name);
    setDepartment(department);
    setTopic(topic);
  };

  const resetFormFields = () => {
    setName("");
    setDepartment(arr[0]);
    setTopic("");
  };

  //   image handlers
  const onChangeHandler = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    const files = e.target.files;
    if (acceptFormat.includes(files[0].type)) {
      setFile(files);
    }
  };
  const handleUpload = async () => {
    setLoading(true);
    try {
      const imgUrl = await ImageService.uploadImage(file, department);
      setLoading(false);
      setMessage({ error: false, msg: "Image uploaded succussfull" + imgUrl });
    } catch (e) {
      return e;
    }
  };
  return (
    <div
      className="main block mt-5 mb-5 container has-text-left container-fluid"
      style={{ maxWidth: 600 }}
    >
      {message?.msg && (
        <article class={`message is-${message?.error ? "danger" : "success"}`}>
          <div class="message-header">
            <p>{message?.error ? "oh no " : "successfull"}</p>
            <button
              class="delete"
              aria-label="delete"
              onClick={() => setMessage("")}
            ></button>
          </div>
          <div class="message-body">{message?.msg}</div>
        </article>
      )}
      {loading && (
        <progress class="progress is-small is-primary" max="100">
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
          <label className="label">Subject</label>
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
        {/*  */}
        <div className="file is-success is-justify-content-center p-5 ">
          <label className="file-label ">
            <input
              className="file-input"
              type="file"
              accept="image/*"
              name="resume"
              onChange={onChangeHandler}
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

        {/*  */}
        <div className="field">
          <p className="control">
            <button className="button is-success">
              {edit.id ? "Edit" : "Submit"}
            </button>
          </p>
        </div>
      </form>
      {img && (
        <button className="button m-5" onClick={handleUpload}>
          upload Image
        </button>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.topic}</td>
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
                    className="button   is-danger is-light"
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
