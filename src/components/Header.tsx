import style from './Header.module.css';
import Logo from '../assets/logo.svg';


export function Header() {
    return (
        <div className={style.header}>
            <div className={style.headerBackground}></div>
            {/* Logo */}
            <img src={Logo} alt='Logotipo da aplicação' />
        </div>
    )
}