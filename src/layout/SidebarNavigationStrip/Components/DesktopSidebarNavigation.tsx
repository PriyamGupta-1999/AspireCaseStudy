import { NavLink } from 'react-router-dom'
import { SIDEBAR_LINKS } from '../../../shared/constants/Constants'
import './DesktopSidebarNavigation.css'
import AspireLogo1x from '../../../assets/Aspire Logo.png'
import AspireLogo2x from '../../../assets/Aspire Logo@2x.png'
import AspireLogo3x from '../../../assets/Aspire Logo@3x.png'
import HomeIcon from '../../../assets/Home.png'
import CardIcon from '../../../assets/Card.png'
import PaymentsIcon from '../../../assets/Payments.png'
import CreditIcon from '../../../assets/Credit.png'
import UserIcon from '../../../assets/user.png'
export default function DesktopSidebarNavigation() {
  return (
    <nav className="sidebar">
      <div className="sidebar__brand">
        <img
          className='sidebar__logo'
          src={AspireLogo1x}
          srcSet={`
            ${AspireLogo1x} 1x,
            ${AspireLogo2x} 2x,
            ${AspireLogo3x} 3x
          `}
          alt="Aspire company logo"
          loading="lazy"
        />
        <h1 className='sr-only'>Aspire</h1>
        <h2 className='sidebar__text'>Trusted way of banking for 3,000+ SMEs and startups in Singapore</h2>
       
      </div>
      <ul className="sidebar__nav">
        {SIDEBAR_LINKS.map((link) => {
          let iconSrc = ''
          switch (link.label) {
            case 'Home':
              iconSrc = HomeIcon
              break
            case 'Cards':
              iconSrc = CardIcon
              break
            case 'Payments':
              iconSrc = PaymentsIcon
              break
            case 'Credit':
              iconSrc = CreditIcon
              break
            case 'Settings':
              iconSrc = UserIcon
              break
            default:
              iconSrc = ''
          }
          return (
            <li className='sidebar-item' key={link.to}>
              {link.label === 'Cards' ? (
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                >
                  <img src={iconSrc} alt="" className="sidebar__icon" aria-hidden="true" />
                  {link.label}
                </NavLink>
              ) : (
                <span className="sidebar__link sidebar__link--disabled">
                  <img src={iconSrc} alt="" className="sidebar__icon" aria-hidden="true" />
                  {link.label}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
