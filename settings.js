function saveOptions(e) {
    e.preventDefault();
    const terms = document.querySelector("#terms").value;
    const filterPlus = document.querySelector("#plusFiltern").checked;
    browser.storage.sync.set({
        terms: terms,
        filterPlus: filterPlus,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#terms").value = result.terms || "trump|musk|elon";
        document.querySelector("#plusFiltern").checked = result.checked || false;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let gettingTerms = browser.storage.sync.get(["terms", "filterPlus"]);
    gettingTerms.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
