import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export default ({ slug, thumbnail, title }) => {
  return (
    <div className="similar-card">
      <Link to={slug} className="similar-card-link">
        {
          thumbnail && <Img
            fluid={thumbnail.childImageSharp.fluid}
            className="similar-card-image"
          />
        }
        <div className="similar-card-content">
          <h2 className="similar-card-title">{title}</h2>
        </div>
      </Link>
    </div>
  );
};
