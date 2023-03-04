import { Tabs, List, Button } from 'antd'
import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
    const { TabPane } = Tabs;
    return (  
        <nav className="navbar">
            
                <Link to="/">
                    Wheel
                </Link>
                <Link to="/normal">
                    Normal
                </Link>
            
        </nav>
    );
}
 
export default Navbar;