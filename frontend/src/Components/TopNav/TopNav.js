import {React , useEffect }from 'react';
import { Link } from 'react-router-dom'
import Logo from "../../Data/Group.png"
import './TopNav.scss'

/**
 * Creates a responsive top navbar with menu and logo (see maquette)
 * @returns {object} returns the created JSX object 
 */
function aa(e){
  window.location = e.target.value
}
function TopNav() {
  

  return(
    <>
      <nav className="topBar">
        
        <ul>
          <li>
            <Link to="/" className='li-logo'>
              <img  src={Logo} className="img-logo" />
              SportSee
            </Link>
          </li>

          <li>
            <Link to="/">
              Accueil
            </Link>
          </li>

          <li>
            
            <select id='userSelect' className='userSelect' onChange={aa}>
              <option value="">
                Profil
              </option>
              <option value="/users/12" >
                12
              </option>
              <option value="/users/18">
                18
              </option>
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

export default TopNav