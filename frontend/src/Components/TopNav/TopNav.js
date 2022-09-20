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
function TopNav(props) {
  
  const FIRST_NAMES = props.names;
  
  if(FIRST_NAMES !== undefined){

    console.log(FIRST_NAMES)

    const OPTIONS = FIRST_NAMES.flatMap((elem) =>  <option value={elem[0]}> {elem[1]} </option>);

    console.log((OPTIONS))

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

  //const OPTIONS = FIRST_NAMES.map((name) => name.id + name.name)

  //console.log(OPTIONS)
  
}

export default TopNav