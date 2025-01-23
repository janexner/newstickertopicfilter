let terms = [
    "musk", "trump", "elon"
];
let removePlusArticles = true;

const includesCaseInsensitive = (str, searchString) =>
    new RegExp(searchString, 'i').test(str);

function onError(error) {
    console.log(`Error: ${error}`);
}
  
function onGot(item) {
    let termString = "trump";
    if (item.terms) {
        termString = item.terms;
        terms = termString.split("|");
        console.log("Newsticker Topic Filter terms: " + terms);
    }
    setTimeout(function(){
        console.log("Newsticker Topic Filter starting...");
        const articleList = document.querySelectorAll(".archive__list>li");
        articleList.forEach((articleListItem) => {
            const titleText = articleListItem.querySelector("span.a-article-teaser__title-text"); 
            if(titleText) { 
                terms.forEach((term) => {
                    if(includesCaseInsensitive(titleText.innerText, term)) {
                        // console.log("Newsticker Topic Filter extension found an offending headline and removed it.");
                        articleListItem.remove();
                    }
                });
            }
            if(removePlusArticles) {
                const plusIcon = articleListItem.querySelector("path.plus-icon-svg-path");
                if(plusIcon) {
                    // console.log("Newsticker Topic Filter extension found a 'plus' article and removed it.");
                    articleListItem.remove();
                }
            }
        });
    }, 1000);
}

const getting = browser.storage.sync.get("terms");
getting.then(onGot, onError);
