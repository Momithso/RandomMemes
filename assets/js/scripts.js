/**
 * API
 */
let searchText = "";
const apiURL = "https://meme-api.herokuapp.com/gimme/";

/**
 * Dcoument is ready for manipulation
 */
$(document).ready(() => {
    getRandomMeme();
});

/**
 * Shows a meme
 */
const getRandomMeme = async () => {

    const searchInput = document.getElementById('SearchInput');
    searchText = searchInput.value;
    searchText = searchText.replace(/[^a-zA-Z]/g, "");

    if (searchText.search("meme") < 0) {
        searchText += "memes";
    }

    const fetchURL = apiURL + searchText;

    console.log(decodeURI(fetchURL));

    // gets json data from api
    let apiResponse = "";
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: fetchURL,
        success: (data) => {
            apiResponse = data;
        },
        error: () => {
            console.log("There was an error.")
        }
    }).done(() => {

        // save the url of the meme into an img tag
        const content = `<div class="memeContainer"><img class="meme" src="${apiResponse.url}"/></div><a class="author" href="${apiResponse.postLink}"" target="_blank">Quelle</a>`

        // clear the last meme
        document.getElementById('ImageContainer').innerHTML = "";

        // insert the new meme
        document.getElementById('ImageContainer').innerHTML += content;
    });
};