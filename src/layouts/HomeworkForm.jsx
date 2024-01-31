import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const HomeworkForm = () => {
  const [subject, setSubject] = useState([]);
  const [input, setInput] = useState({
    subjectId: "",
    question: "",
    startdate: new Date(),
    duedate: new Date(),
    isPublished: false,
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get("http://localhost:8888/subject");
        setSubject(res.data.subjects);
      } catch (error) {
        console.log(error);
      }
    };
    run();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8888/homework", input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 min-w-[600px] w-4/6 border mx-auto p-4 rounded">
      <h1 className="text-4xl">New Homework</h1>
      <form className="form-control gap-2" onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Select Subject</span>
          </div>
          <select
            className="select select-bordered"
            value={input.subjectId}
            name="subjectId"
            onChange={handleChange}
          >
            <option disabled value="">
              Pick one
            </option>
            {subject.map((el) => (
              <option key={el.id} value={el.id}>
                {el.title}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Question</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Question"
            value={input.question}
            name="question"
            onChange={handleChange}
          ></textarea>
        </label>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-5">
            <span className="label-text">Publish</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={input.isPublished}
              onChange={() =>
                setInput((prv) => ({ ...prv, isPublished: !prv.isPublished }))
              }
            />
          </label>
        </div>
        <div className="flex justify-between px-3">
          <div className="form-control">
            <div className="label">
              <span className="label-text">Start date</span>
            </div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={input.startdate}
              onChange={(date) =>
                setInput((prv) => ({ ...prv, startdate: date }))
              }
            />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Due date</span>
            </div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={input.duedate}
              onChange={(date) =>
                setInput((prv) => ({ ...prv, duedate: date }))
              }
            />
          </div>
        </div>
        <button className="btn btn-outline btn-primary mt-[150px]">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomeworkForm;
