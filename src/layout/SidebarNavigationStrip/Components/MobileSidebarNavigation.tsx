
import { NavLink } from 'react-router-dom';
import { SIDEBAR_LINKS } from '../../../shared/constants/Constants';
import './MobileSidebarNavigation.css';
import HomeIcon from '../../../assets/Home.png';
import CardIcon from '../../../assets/Card.png';
import PaymentsIcon from '../../../assets/Payments.png';
import CreditIcon from '../../../assets/Credit.png';
import UserIcon from '../../../assets/user.png';

export default function MobileSidebarNavigation() {
  return (
    <nav className="mobile-sidebar" aria-label="Primary">
      <ul className="mobile-sidebar__list">
        {SIDEBAR_LINKS.map((link) => {
          let iconSrc = '';
          switch (link.label) {
            case 'Home':
              iconSrc = HomeIcon;
              break;
            case 'Cards':
              iconSrc = CardIcon;
              break;
            case 'Payments':
              iconSrc = PaymentsIcon;
              break;
            case 'Credit':
              iconSrc = CreditIcon;
              break;
            case 'Settings':
              iconSrc = UserIcon;
              break;
            default:
              iconSrc = '';
          }
          return (
            <li className="mobile-sidebar__item" key={link.to}>
              {link.label === 'Cards' ? (
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `mobile-sidebar__link ${isActive ? 'mobile-sidebar__link--active' : ''}`
                  }
                >
                  <img src={iconSrc} alt="" className="mobile-sidebar__icon" aria-hidden="true" />
                  <span className="mobile-sidebar__label">{link.label}</span>
                </NavLink>
              ) : (
                <span className="mobile-sidebar__link mobile-sidebar__link--disabled">
                  <img src={iconSrc} alt="" className="mobile-sidebar__icon" aria-hidden="true" />
                  <span className="mobile-sidebar__label">{link.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
