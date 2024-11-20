import Logo from './logo.png';
import './Header.css'; 

function Header() {
    return (
        <div>
            <img src={Logo} className="logo" alt="Logo" />
        </div>
    );
}

export default Header;

