//profile form to change password

import { useRef, useContext } from 'react';
import  { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBvJhFUwVCYP6FU2ufDa6DwFRlpsiLOPp0', {
      method:'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        retunSecureToken: false
      }),
      headers: {
        'Content-Type': 'appliaction/json'
      }
    }).then( res => {
      //assumption: Always succeed!

      history.replace('/'); 
    });

  };


  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef }/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;




// import { useRef, useContext } from 'react';
// import { useHistory } from 'react-router-dom';

// import AuthContext from '../../store/auth-context';
// import classes from './ProfileForm.module.css';

// const ProfileForm = () => {
//   const history = useHistory();

//   const newPasswordInputRef = useRef();
//   const authCtx = useContext(AuthContext);

//   const submitHandler = (event) => {
//     event.preventDefault();

//     const enteredNewPassword = newPasswordInputRef.current.value;

//     // add validation

//     fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBZhsabDexE9BhcJbGxnZ4DiRlrCN9xe24', {
//       method: 'POST',
//       body: JSON.stringify({
//         idToken: authCtx.token,
//         password: enteredNewPassword,
//         returnSecureToken: false
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then(res => {
//       // assumption: Always succeeds!

//       history.replace('/');
//     });
//   };

//   return (
//     <form className={classes.form} onSubmit={submitHandler}>
//       <div className={classes.control}>
//         <label htmlFor='new-password'>New Password</label>
//         <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
//       </div>
//       <div className={classes.action}>
//         <button>Change Password</button>
//       </div>
//     </form>
//   );
// };

// export default ProfileForm;