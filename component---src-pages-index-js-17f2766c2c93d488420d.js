(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"+7fW":function(e,t,a){},DNPW:function(e,t,a){"use strict";var n=a("9Hrx"),r=a("q1tI"),o=a.n(r),s=a("Wbzz"),c=function(e){function t(){return e.apply(this,arguments)||this}return Object(n.a)(t,e),t.prototype.render=function(){var e=this.props.tags;return o.a.createElement("div",{className:"post-card-tags"},e&&e.map((function(e){return o.a.createElement("span",{key:e},o.a.createElement(s.Link,{className:"post-card-tag-link",key:e,to:"/tags/"+e},"#",e)," ")})))},t}(r.Component),l=a("9eSz"),i=a.n(l),d=(t.a=function(e){return o.a.createElement("article",{className:"post-card "+(e.count%3==0&&"post-card-large")+" "+e.postClass+" "+(e.node.frontmatter.thumbnail?"with-image":"no-image")},e.node.frontmatter.thumbnail?o.a.createElement(m,{props:e}):o.a.createElement(d,{props:e}))},function(e){function t(){return e.apply(this,arguments)||this}return Object(n.a)(t,e),t.prototype.render=function(){var e=this.props.props;return o.a.createElement("div",{className:"post-card-content"},o.a.createElement("div",null,o.a.createElement(c,{tags:e.node.frontmatter.tags})),o.a.createElement("div",null,o.a.createElement(s.Link,{to:e.node.fields.slug,className:"post-card-link"},o.a.createElement("h2",{className:"post-card-title"},e.node.frontmatter.title||e.node.fields.slug))),o.a.createElement("div",{className:"post-card-date"},e.node.frontmatter.date),o.a.createElement("div",{className:"post-card-body"},e.node.frontmatter.description||e.node.excerpt),o.a.createElement("div",null,o.a.createElement(s.Link,{to:e.node.fields.slug,className:"post-card-link post-card-readmore"},e.node.frontmatter.description||e.node.excerpt?"Read more":null)))},t}(r.Component)),m=function(e){function t(){return e.apply(this,arguments)||this}return Object(n.a)(t,e),t.prototype.render=function(){var e=this.props.props;return o.a.createElement(s.Link,{to:e.node.fields.slug,className:"post-card-link"},o.a.createElement(i.a,{fluid:e.node.frontmatter.thumbnail.childImageSharp.fluid,className:"post-card-image"}),o.a.createElement("div",{className:"post-card-content"},o.a.createElement("h2",{className:"post-card-title"},e.node.frontmatter.title||e.node.fields.slug),o.a.createElement("div",{className:"post-card-date"},e.node.frontmatter.date),o.a.createElement("div",{className:"post-card-body"},e.node.frontmatter.description||e.node.excerpt)))},t}(r.Component)},RXBc:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),o=a("Wbzz"),s=a("9eSz"),c=a.n(s),l=a("Bl7J"),i=a("vrFN"),d=a("DNPW"),m=(a("+7fW"),a("wvC7"),function(e,t){var a=e.data,n=a.site.siteMetadata.title,o=a.allMarkdownRemark.edges,s=0;return r.a.createElement(l.a,{title:n},r.a.createElement(i.a,{title:"Rowerem jedziemy | blog",keywords:["blog","rower","zwiedzanie","podróże","wyprawy"]}),a.site.siteMetadata.description&&r.a.createElement("header",{className:"page-head"},r.a.createElement("h2",{className:"page-head-title"},r.a.createElement(c.a,{fluid:a.logo.childImageSharp.fluid,className:"kg-image"}),a.site.siteMetadata.description)),r.a.createElement("div",{className:"post-feed"},o.map((function(e){var t=e.node;return s++,r.a.createElement(d.a,{key:t.fields.slug,count:s,node:t,postClass:"post"})}))))});t.default=function(e){return r.a.createElement(o.StaticQuery,{query:"1355447116",render:function(t){return r.a.createElement(m,Object.assign({location:e.location,props:!0,data:t},e))}})}}}]);
//# sourceMappingURL=component---src-pages-index-js-17f2766c2c93d488420d.js.map