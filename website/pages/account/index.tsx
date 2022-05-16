import { useEffect, useState } from 'react';
import React from 'react';
import { Loading } from '../../components/Loading';
import { useUserContext } from '../../context/userContext';
import styles from '../../styles/dashboard/index.module.scss';
import { userServiceUpdateById } from '../../services/userService';

const Account: React.FC = () => {
  const { userDb, isFetching } = useUserContext();
  const [username, setUsername] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [appPin, setAppPin] = useState<string>('');

  const [clicked, setClicked] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (userDb) {
      setUsername(userDb.username);
      if (userDb.origin) setCity(userDb.origin);
      if (userDb.mobilePassword) setAppPin(userDb.mobilePassword);
    }
  }, [userDb]);

  if (isFetching) return <Loading />;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 2000);

    if (userDb) {
      const data = {
        username: username,
        origin: city,
        mobilePassword: appPin,
      };

      await userServiceUpdateById(userDb.id + '', data);
    }
  };

  return (
    <>
      <header className={styles.dashboard_header}></header>
      <div className={styles.account}>
        <h1>Update your profile data!</h1>
        <div className={styles.account_wrapper}>
          <div
            className={styles.account_profile}
            style={{ backgroundImage: `url(${userDb?.pictureUrl})` }}
          ></div>
          <form>
            <div className={styles.form_input}>
              <div className={styles.form_input_header}>
                <label>Username</label>
                <span>Optional</span>
              </div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.form_input}>
              <div className={styles.form_input_header}>
                <label>City</label>
                <span>Optional</span>
              </div>
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className={styles.form_input}>
              <div className={styles.form_input_header}>
                <label>App PIN</label>
                <span>Optional</span>
              </div>
              <input
                type='password'
                onChange={(e) => setAppPin(e.target.value)}
              />
            </div>
            <div className={styles.form_bottom}>
              <button onClick={() => handleSubmit(event)} type='submit'>
                Update
              </button>
              {clicked && (
                <span className={styles.form_submitted}>Updated!</span>
              )}
              {error && (
                <span className={styles.form_error}>
                  Error! Please try again!
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Account;
