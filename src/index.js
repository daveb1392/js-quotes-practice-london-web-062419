// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

const addQuoteForm = document.querySelector(".new-quote-form");

const QUOTES_URL = "http://localhost:3000/quotes?_embed=likes";

const getQuotes = () => {
    fetch(QUOTES_URL)
        .then(resp => resp.json())
        .then(allQuotes => {
            renderAllQuotes(allQuotes);
        });
};

// delete a quote yo!

const deleteQuoteRequest = quoteId => {
    // function releasePokemonRequest, expects arg of pokemonId
    return fetch(`${QUOTES_URL}/${quoteId}`, {
        // returns a fetch of pokemons URL (above) and interpolates the pokemonId we passed in
        method: "DELETE" // we stipulate that our method here is delete
    }).then(resp => resp.json()); // Returns the deleted pokemon in resp so we can add confirmation messages etc.
};

//create a quote

// const createQuote = newQuote => {
//   return fetch(QUOTES_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "applicaton/json"
//     },
//     body: JSON.stringify(newQuote)
//   }).then(resp => resp.json());
// };

const updateLikes = quote => {
    const quoteUrl = `${QUOTES_URL}/${quote.id}`;
    const updatedLikes = { likes: ++quote.likes };

    return fetch(quoteUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "applicaton/json"
        },
        body: JSON.stringify(updatedLikes)
    }).then(resp => resp.json());
};

const renderAllQuotes = allQuotes => {
    allQuotes.map(quote => renderQuote(quote));
};

const renderQuote = quote => {
    const quotesList = document.querySelector("#quote-list");
    const li = renderQuoteCard(quote);
    quotesList.append(li);
};

const renderQuoteCard = quote => {
    const li = document.createElement("li");
    const block = document.createElement("blockquote");
    const p = document.createElement("p");
    const footer = document.createElement("footer");
    const btn_s = document.createElement("button");
    const btn_d = document.createElement("button");
    const span = document.createElement("span");

    li.className = "quote-card";
    p.className = "mb-0";
    p.innerText = quote.quote;
    block.className = "blockquote";
    footer.className = "blockquote-footer";
    footer.innerText = quote.author;
    btn_s.innerText = `Likes: ${quote.likes.id}`;
    btn_s.className = "btn-success";
    btn_d.innerText = "Delete";
    btn_d.className = "btn-danger";

    btn_d.addEventListener("click", () => deleteQuote(quote.id, li));

    li.append(block, p, footer, btn_s, span, btn_d);
    btn_s.addEventListener("click", () => {
        handleUpdateLikes(li, quote);
    });
    return li;
};

const deleteQuote = (quoteId, li) => {
    deleteQuoteRequest(quoteId).then(() => li.remove());
};

const init = () => {
    getQuotes();
};

document.addEventListener("DOMContentLoaded", init);
