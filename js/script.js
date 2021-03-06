/* eslint-disable no-inner-declarations */
'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a')
//     console.log('links:', links);
// })
{

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optPostAuthor = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optAutorListSelector = '.authors',
    optCloudClassPrefix = 'tag-size-';

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    //console.log('clickedElement (with plus): ' + clickedElement);

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    //console.log('href', articleSelector);


    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };



  const generateTitleList = function (customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);


    let html = '';
    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* create HTML of the link */

      //version 1
      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      //version 2 by handlebars:
      const linkHTMLData = {
        id: articleId,
        title: articleTitle
      };
      const linkHTML = templates.articleLink(linkHTMLData);
      /* insert link into 
              titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;
  };


  generateTitleList();
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }


  const calculateTagsParams = function (tags) {
    const params = {
      min: 1000,
      max: 0
    };

    for (let tag in tags) {
      if (params.max < tags[tag]) {
        params.max = tags[tag];
      }
      if (params.min > tags[tag]) {
        params.min = tags[tag];
      }
    }

    //short if
    //params.max = tags[tag] > params.max ? tags[tag] : params.max;


    return params;


  };

  const calculateAuthorParams = function (authors) {
    const params = {
      min: 1000,
      max: 0
    };

    for (let author in authors) {
      if (params.max < authors[author]) {
        params.max = authors[author];
      }
      if (params.min > authors[author]) {
        params.min = authors[author];
      }
    }

    return params;
  };

  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  };

  const generateTags = function () {
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        // const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + ' </a>, </li>';
        const linkHTMLData = {
          id: 'tag-' + tag,
          title: tag
        };
        const linkHTML = templates.tagLink(linkHTMLData);
        /* add generated code to html variable */

        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    /* [NEW] add html from allTags to tagList */
    // tagList.innerHTML = allTags.join(' ');
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    // let allTagsHTML = '';
    const allTagsData = {
      tags: []
    };
    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //  const tagLinkHTML = '<li><a href ="#tag-' + tag + '"' + 'class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' ' + allTags[tag] + '</a></li>';
      // console.log('tagLinkHTML:', tagLinkHTML);
      // allTagsHTML += tagLinkHTML;
      //handlebars
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    // tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);

    console.log(allTagsData);
  };

  generateTags();

  const generateAutors = function () {
    let allAuthors = {};

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      const authorWrapper = article.querySelector(optPostAuthor);
      const articleAuthor = article.getAttribute('data-author');
      //version 1
      //const linkHTML = `<li><a href="#author-${articleAuthor}">${articleAuthor}</a></li>`;

      //version handlebars
      const linkHTMLData = {
        id: 'author-' + articleAuthor,
        title: articleAuthor
      };
      const linkHTML = templates.authorLink(linkHTMLData);


      authorWrapper.innerHTML = linkHTML;

      if (!allAuthors[articleAuthor]) {
        /* [NEW] add generated code to allTags array */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }


      // let html = '';
      const allAuthorData = {
        authors: []
      };
      for (let author in allAuthors) {

        //      html += `<li><a href ="#author -${author}">${author} ${allAuthors[articleAuthor]} </a></li>`;
        allAuthorData.authors.push({
          author: author,
          count: allAuthors[articleAuthor]
        })
      }

      const authorList = document.querySelector(optAutorListSelector);
      // authorList.innerHTML = html;
      authorList.innerHTML = templates.authorCloudLink(allAuthorData);
      console.log(allAuthorData);
    }
  };

  generateAutors();

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
      /* remove class active */
      activeTagLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleList('[data-tags~="' + tag + '"]');
  };

  const authorClickHandler = function (event) {

    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthorLink of activeAuthorLinks) {
      activeAuthorLink.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorLink of authorLinks) {
    
      authorLink.classList.add('active');
    
    }
    generateTitleList('[data-author="' + author + '"]');
  
  };

  function addClickListenersToTags() {
    /* find all links to tags */

    const links = document.querySelectorAll('a[href^="#tag-"]');

    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();



function addClickListenersToAuthors() {
  const links = document.querySelectorAll('a[href^="#author-"]');
  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();

}
