import orderBy from 'lodash.orderby';

function getSeriesNumber(part) {
  if (!Array.isArray(part) || part.length === 0) {
    return null;
  }
  if(part[part.length - 1].match(/cz(\d+)/gm)) {
    return parseInt(part[part.length - 1].match(/(\d+)/gm)[0]);
  }
  return null;
}

function getSeriesName(part) {
  if (!Array.isArray(part) || part.length === 0) {
    return undefined;
  }
  return part.slice(0, part.length - 1).join('/');
}

function isPartOfSeries(part) {
  return getSeriesNumber(part) != null;
}

function filterArticlesFromTheSameSeries(part, articles) {
  const originalSeriesName = getSeriesName(part);
  return articles.filter(article => {
    return originalSeriesName === getSeriesName(article.part)
  })
}

function filterArticlesAfterPart(articles, partNumber) {
  if(!Array.isArray(articles)) {
    return [];
  }
  return articles.filter(article => {
    const articleNumb = getSeriesNumber(article.part);
    return articleNumb > partNumber;
  })
}

export function getPartData(partString) {
  if(typeof partString !== 'string') {
    return [];
  }
  return partString.split('/').filter(part => part !== '');
}

export class SimilarArticlesFactory {
  // (1.) Create by passing in articles, currentSlug
  constructor (articles, currentArticleSlug, currentArticleDate, currentArticlePart) {
    // (2.) Don't include the current article in articles list
    this.articles = articles.filter(
      (article) => article.slug !== currentArticleSlug && article.date !== currentArticleDate);

    this.currentArticleDate = currentArticleDate;
    this.currentArticleSlug = currentArticleSlug;
    this.currentArticlePart = currentArticlePart ? currentArticlePart : null
    // (3.) Set default values
    this.maxArticles = 3;
    this.tags = []
  }

  // (4.) Builder pattern usage
  setMaxArticles (m) {
    this.maxArticles = m;
    return this;
  }

  setTags (tagsArray) {
    this.tags = tagsArray;
    return this;
  }

  getArticles () {
    const { tags, articles, maxArticles, currentArticleDate, currentArticlePart, currentArticleSlug } = this;
    // (5.) We use an Identity Map to keep track of score
    const identityMap = {};

    if (!!tags === false || tags.length === 0) {
      console.error('SimilarArticlesFactory: Tags not provided, use setTags().')
      return [];
    }

    function getSlug (article) {
      return article.slug;
    }

    function addToMap (article) {
      const slug = getSlug(article);
      if (!identityMap.hasOwnProperty(slug)) {
        identityMap[slug] = {
          article: article,
          date: article.timestamp,
          category: article.category,
          part: article.part,
          points: 0
        }
      }
    }

    // (8.) For tags matches, we add 1 point
    function addTagsPoints (article, tags) {
      const tagPoint = 1;
      const slug = getSlug(article);

      article.tags.forEach((aTag) => {
        if (tags.includes(aTag)) {
          identityMap[slug].points += tagPoint;
        }
      })
    }

    function getIdentityMapAsArray () {
      return Object.keys(identityMap).map((slug) => identityMap[slug]);
    }

    let similarArticles = []

    if(isPartOfSeries(currentArticlePart)) {
      const articlesFromSeries = filterArticlesFromTheSameSeries(currentArticlePart, articles);
      if(articlesFromSeries.length > 0) {
        const currentArtNumber = getSeriesNumber(currentArticlePart);
        similarArticles = orderBy(
          filterArticlesAfterPart(articlesFromSeries, currentArtNumber), ['timestamp'], ['asc']
        )
      }
    } else {

      // (6.) Map over all articles, add to map and add points
      for (let article of articles) {
        addToMap(article);
        addTagsPoints(article, tags)
      }

      // (9.) Convert the identity map to an array
      const arrayIdentityMap = getIdentityMapAsArray();
      similarArticles = orderBy(
        arrayIdentityMap, ['points', 'date'], ['desc', 'desc']
      ).map(art => art.article)
    }


    // (10.) Use a lodash utility function to sort them
    // by points, from greatest to least
    // const articlesAfterCurrent = similarArticles.filter(article => article.date >= currentArticleDate)

    // (11. Take the max number articles requested)
    return similarArticles.splice(0, maxArticles);
  }
}