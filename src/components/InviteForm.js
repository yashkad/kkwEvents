import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const InviteForm = () => {
  const form = useRef();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [hod, setHod] = useState("");
  const [prin, setPrin] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  const scrollRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const executeScroll = () => scrollToRef(scrollRef);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_i2ug13l",
        "template_hm28did",
        form.current,
        "dGFcU2zLD_LR9067e"
      )
      .then(
        (result) => {
          console.log(result.text);
          setShowMessage(true);
          executeScroll();
        },
        (error) => {
          console.log(error.text);
        }
      );
    resetAll();
  };

  const resetAll = () => {
    setName("");
    setEmail("");
    setDate("");
    setSubject("");
    setTopic("");
    setHod("");
    setPrin("");
  };

  const sendEmail = () => {
    console.log("inside sendEmail");
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "easymail.p.rapidapi.com",
        "X-RapidAPI-Key": "bf5bf7ce00msh8d6e256c49ca1e5p1a2826jsne8d27a1059e8",
      },
      body: '{"from":{"name":"Example"},"to":{"name":"John Doe","address":"yashkad412@gmail.com"},"subject":"This is the mail subject","message":"Hello John, how are you ?","show_noreply_warning":true}',
    };

    fetch("https://easymail.p.rapidapi.com/send", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="main block mt-5 mb-5 container has-text-left container-fluid"
      style={{ maxWidth: 600 }}
    >
      {showMessage && (
        <div className="notification is-primary" ref={scrollRef}>
          Form submitted successfully.
          <button
            className="delete"
            onClick={() => setShowMessage(false)}
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit} ref={form}>
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
          <p className="help">To send invitation enter email</p>
        </div>

        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              required
              name="name"
              className="input"
              type="text"
              placeholder="Name of Guest"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* <p className="help">This is a help text</p> */}
        </div>

        <div className="field">
          <label className="label">Subject</label>
          <div className="control">
            <input
              required
              name="subject"
              className="input"
              type="text"
              placeholder="Enter the subject of email"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          {/* <p className="help">This is a help text</p> */}
        </div>

        <div className="field">
          <label className="label">Topic</label>
          <div className="control">
            <textarea
              name="topic"
              className="textarea"
              type="text"
              placeholder="Enter the topic of event"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <p className="help">Describe the topic in brief</p>
        </div>

        <div className="field">
          <label className="label">HOD</label>
          <div className="control">
            <input
              required
              name="hod"
              className="input"
              type="text"
              placeholder="Name of HOD"
              value={hod}
              onChange={(e) => setHod(e.target.value)}
            />
          </div>
          {/* <p className="help">This is a help text</p> */}
        </div>

        <div className="field">
          <label className="label">Principal</label>
          <div className="control">
            <input
              required
              name="principal"
              className="input"
              type="text"
              placeholder="Name of Principal"
              value={prin}
              onChange={(e) => setPrin(e.target.value)}
            />
          </div>
          {/* <p className="help">This is a help text</p> */}
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
          <p className="control">
            <button className="button is-success">Submit</button>
          </p>
        </div>
      </form>

      <h1 onClick={sendEmail} className="button">
        Send email
      </h1>
    </div>
  );
};

export default InviteForm;
