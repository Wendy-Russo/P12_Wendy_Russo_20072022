import {React }from 'react';
import { Link } from 'react-router-dom'
import Logo from "../../Data/Group.png"
import './TopNav.scss'
import { PropTypes } from "prop-types";

/**
 * Creates a responsive top navbar with menu and logo (see maquette)
 * @returns {object} returns the created JSX object 
 */
function TopNav(props) {
  
  const FIRST_NAMES = props.names;
  
  if(FIRST_NAMES){

    //console.log(typeof(FIRST_NAMES))

    const OPTIONS = FIRST_NAMES.flatMap((elem,id) =>  <option key={id} value={elem[0]}> {elem[1]} </option>);

    return(
      <>
        <nav className="topBar">
          
          <ul>
            <li>
              <Link to="/" className='li-logo'>
                <img src={Logo} alt="logo" className="img-logo" />
                SportSee
              </Link>
            </li>
  
            <li>
              <Link to="/">
                Accueil
              </Link>
            </li>
            <li>
              <select id='userSelect' className='userSelect' onChange={(e) => window.location = e.target.value}>
                <option value="">
                  Profil
                </option>
                {OPTIONS}
              </select>
            </li>
            <li>
                Réglage
            </li>
  
            <li>
                Communauté
            </li>
  
          </ul>
        </nav>
      </>
    )
  }
  
}
TopNav.propTypes = {
  names: PropTypes.array
}

export default TopNav