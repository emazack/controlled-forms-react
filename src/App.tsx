import React, { useState } from 'react';

interface FormData {
  username: string;
  job: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({ username: 'guest', job: 'freelance'});

  // UPDATED) ChangeHandler now updates both, 'username' or 'job' state properties
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      // copy all values from the previous form state
      ...formData,
      // Update username or job property in according with the control `name`
      [e.currentTarget.name]: e.currentTarget.value,
    })
  };

  // NEW) Submit: display formData in console and reset the form state
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // avoid HTML form behavior (page refresh)
    e.preventDefault()
    // get all form state values
    // console.log(formData)
    // reset form
    setFormData({ username: '', job: ''})
  };

  return (
    <div className="container mt-2">
      <pre>{JSON.stringify(formData)}</pre>

      {/* NEW: wrap the input with the form*/}
      <form onSubmit={onSubmitHandler}>
        <input
          name="username"
          className="form-control mb-2"
          type="text"
          placeholder="Write your username..."
          onChange={onChangeHandler}
          value={formData.username}
        />
        <select
          name="job"
          className="form-control mb-2"
          onChange={onChangeHandler}
          value={formData.job}
        >
          <option value="">Select your job</option>
          <option value="freelance">Freelance</option>
          <option value="employee">Employee</option>
        </select>

        {/*NEW: add a submit button*/}
        <button className="btn btn-primary" type="submit">SEND</button>
      </form>
    </div>
  );
};

export default App;
