function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        terms: document.querySelector("#terms").value,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#terms").value = result.terms || "trump|musk|elon";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("terms");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
