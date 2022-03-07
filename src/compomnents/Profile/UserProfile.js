import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <hr></hr>
      <hr></hr>
      <br></br>
      <h2>You can change your password here</h2>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
