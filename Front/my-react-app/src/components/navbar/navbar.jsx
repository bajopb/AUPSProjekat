import { useContext } from 'react';
import classes from './navbar.css'
import AuthContext from "../../context/authContext";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const context = useContext(AuthContext);

  
  const handleLogout = (e) => {
    e.preventDefault();
    context.onLogout();
  }

  return (
    <nav className={classes.navbar}>
      <ul>
        {context.token && (
          <li>
            <Link to="/employees">Radnici</Link>
          </li>
        )}
        <li>
          {context.token && (
            <Link to="/materials" className={classes.link}>
              Materijali
            </Link>
          ) 
          }
        </li>
        <li>
          {context.token && (
            <Link to="/productionOrders" className={classes.link}>
              Nalozi za proizvodnju
            </Link>
          ) 
          }
        </li>
        <li>
          {context.token && (
            <Link to="/objectsOfLabor" className={classes.link}>
              Predmeti rada
            </Link>
          ) 
          }
        </li>
        
        <li>
          {context.token && (
            <Link to="/productionPlans" className={classes.link}>
              Planovi proizvodnje
            </Link>
          ) 
          }
        </li>
        
        <li>
          {context.token && (
            <Link to="/warehouses" className={classes.link}>
              Skladista
            </Link>
          ) 
          }
        </li>
        <li>
          {context.token && (
            <Link to="/plants" className={classes.link}>
              Postrojenja
            </Link>
          ) 
          }
        </li>
        <li>
          {context.token && (
            <Link to="/organizationalUnits" className={classes.link}>
              Organizacione jedinice
            </Link>
          ) 
          }
        </li>
        <li>
          {context.token && (
            <Link to="/tecnologicalProcedures" className={classes.link}>
              Tehnoloski postupci
            </Link>
          ) 
          }
        </li>
        <li>
          {context.token && (
            <Link to="/technologicalSystems" className={classes.link}>
              Tehnoloski sistemi
            </Link>
          ) 
          }
        </li>
        <li>
          {context.token && (
            <Link to="/workplaces" className={classes.link}>
              Radna mesta
            </Link>
          ) 
          }
        </li>
        <li>
          {context.token && (
            <button onClick={handleLogout} className={classes.link}>
              Odjavi se
            </button>
          ) 
          }
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;