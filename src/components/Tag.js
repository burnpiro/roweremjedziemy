import React, { Component } from "react";
import { Link } from "gatsby";

class Tags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="post-card-tags">
        {tags &&
          tags.map(tag => (
            <span key={tag}>
            <Link className="post-card-tag-link"
            key={tag}
            // style={{ textDecoration: "none" }}
            to={`/tags/${tag}`}
            >
            #{tag}
            </Link>
            {" "}</span>
          ))}
      </div>
    );
  }
}

export default Tags;