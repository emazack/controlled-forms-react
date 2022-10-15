
import React, { useState } from 'react';
import classnames from 'classnames';

interface FormData {
  username: string;
  job: string;
  city: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({ username: '', job: '' , city: ''});
  // const [dirty, setDirty] = useState<boolean>(false);
  const [touched, isTouched] = useState<boolean>(false);

  // NEW: validators
  const [isUserNameValid, isCityNameValid] = [formData.username.length > 3, formData.city.length > 3];
  const isJobValid = formData.job !== ''
  const isValid = isUserNameValid && isJobValid && isCityNameValid;

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    isTouched(true);
  };

  // UPDATED) ChangeHandler now updates both, 'username' or 'job' state properties
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      // copy all values from the previous form state
      ...formData,
      // Update username or job property in according with the control `name`
      [e.currentTarget.name]: e.currentTarget.value,
    })
    // Set dirty to true when the user writes into any form control
    // setDirty(true);
  };

  // NEW) Submit: display formData in console and reset the form state
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // avoid HTML form behavior (page refresh)
    e.preventDefault()
    if (isValid) {
      // get all form state values
      console.log(formData)
      // reset form
      setFormData({ username: '', job: '' , city: ''})
    } else {
      console.error("Error");
    }
  };

  return (
    <div className="container mt-2">
      <pre>{JSON.stringify(formData)}</pre>

      {/* NEW: wrap the input with the form*/}
      <form onSubmit={onSubmitHandler}>
        <input
          onBlur={onBlurHandler}
          name="username"
          className={classnames(
            'form-control mb-2',
            {'is-valid': isUserNameValid},
            {'is-invalid': 
            !isUserNameValid 
            // && dirty
            && touched
          }
          )}
          type="text"
          placeholder="Write your username..."
          onChange={onChangeHandler}
          value={formData.username}
        />
        <input
          onBlur={onBlurHandler}
          name="city"
          className={classnames(
            'form-control mb-2',
            {'is-valid': isCityNameValid},
            {'is-invalid': !isCityNameValid 
            // && dirty
            && touched
          }
          )}
          type="text"
          placeholder="Write your city..."
          onChange={onChangeHandler}
          value={formData.city}
        />        
        <select
          onBlur={onBlurHandler}
          name="job"
          className={classnames(
            'form-control mb-2',
            {'is-valid': isJobValid},
            {'is-invalid': !isJobValid 
            // && dirty
            && touched
          }
          )}
          onChange={onChangeHandler}
          value={formData.job}
        >
          <option value="">Select your job</option>
          <option value="freelance">Freelance</option>
          <option value="employee">Employee</option>
        </select>

        {/*NEW: add a submit button*/}
        <button disabled={!isValid} className="btn btn-primary" type="submit">SEND</button>
      </form>
    </div>
  );
};

export default App;
