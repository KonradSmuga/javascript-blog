/* eslint-disable no-inner-declarations */
'use strict';
// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a')
//     console.log('links:', links);
// })
{
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

    console.log('clickedElement (with plus): ' + clickedElement);

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('href', articleSelector);


    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optPostAuthor = '.post-author';

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
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

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




  const generateTags = function () {
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
        const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + ' </a>, </li>';
        /* add generated code to html variable */
        html += linkHTML;
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
      /* END LOOP: for every article: */
    }
  };
  generateTags();


  const generateAutors = function () {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      const authorWrapper = article.querySelector(optPostAuthor);
      const articleAuthor = article.getAttribute('data-author');
      const linkHTML = `<li><a href="#author-${articleAuthor}">${articleAuthor}</a></li>`;
      authorWrapper.innerHTML = linkHTML;
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
    const tagLinks = document.querySelectorAll(tag);
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
    /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleList('[data-tags~="' + tag + '"]');
  };

  function addClickListenersToTags() {
  /* find all links to tags */
    
    const links = document.querySelectorAll('post-tags');

    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
    }

  }

  addClickListenersToTags();

}