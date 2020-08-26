import React from "react"
import { Link } from "gatsby"

import logo from './logo_small.png'
import gh from './github.png'
import fb from './fb.png'
import strava from './strava.png'

const Layout = props => {
  const { title, backgroundImage, children } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`} >
      {
        backgroundImage && (
          <div className={`background-image-wrapper`} style={{
            backgroundImage: `url(${backgroundImage})`
          }}>

          </div>
        )
      }
      <header className="site-head">
        <div id="menu" className="site-head-container">
          <a
            className="nav-burger"
            href={`#menu`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div> <div className="hamburger-text-menu-text hidden">Menu</div>
            </div>
          </a>
          <nav id="swup" className="site-head-left">
            <ul className="nav" role="menu">
              <li className="nav-home" role="menuitem">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="nav-about" role="menuitem">
                <Link to={`https://erdem.pl/pages/about`}>O mnie</Link>
              </li>
              {/*<li className="nav-elements" role="menuitem">*/}
              {/*  <Link to={`/elements`}>Elements</Link>*/}
              {/*</li>*/}
              <li className="nav-tags" role="menuitem">
                <Link to={`/tags`}>Tagi</Link>
              </li>
            </ul>
          </nav>
          <div className="site-head-center">
            <Link className="site-head-logo" to={`/`}>
              <img src={logo} alt="logo"/>
              {title}
            </Link>
          </div>
          <div className="site-head-right">
            <div className="social-links">
              <a
                href="https://www.facebook.com/pirokemal/"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={fb} aria-label="Facebook" alt="Facebook"/>
              </a>
              <a
                href="https://www.strava.com/athletes/24062720"
                title="Strava"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={strava} aria-label="Strava" alt="Strava" />

              </a>
              <a
                href="https://github.com/burnpiro"
                title="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={gh} aria-label="GitHub" alt="GitHub" />

              </a>
            </div>
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot">
        &copy; 2012 - {new Date().getFullYear()} <Link to={`/`}>{title}</Link> &mdash;
        Built with{" "}
        <a
          href="https://gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a>
      </footer>
    </div>
  )
}

export default Layout
