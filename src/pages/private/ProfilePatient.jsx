import {useState} from 'react'


import styles from "./styles/ProfilePatient.module.css";
import imgPerfil from "../../assets/images/perfil-1.jpg";

const ProfilePatient = () => {

  const [first, setfirst] = useState(null)


  return (
    <>
      <div className={styles.containerProfile}>

        



        <div className={styles.containerCardDatePerson}>
          <div>
            <h1>Datos Personales</h1>
            <h2>Oscar Gonzales</h2>
            <h3>C.I 22455676</h3>

          </div>

        </div>
        
      </div>
    </>
  );
};

export default ProfilePatient;
