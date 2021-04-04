// cardName: string, case sensitive
// Return a promise ( getJpDesc().then((str) => { ... }) )
function getJpDesc(cardName)
{
	cardName = cardName.replace(/ /g, `_`);
	let res = ``
	return fetch(`https://yugipedia.com/wiki/${cardName}`)
		.then((resp) => resp.text())
		.then((text) => {
			let start = text.indexOf(`<span lang="ja">`, text.search(/<th.+?japanese<\/th>/gi));
			let end = text.indexOf(`</span>`, start + 1);
			return text.substring(start + 16, end).replace(/(<ruby lang="ja"><rb>|<\/rb.*?<\/ruby>)/gi, '');
		});
}

/*
// Get card URL to db.yugioh-card
// Require CORS permission to access
function getCardUrl(doc)
{
	return doc.match(/(?<=")[^\s]+?request_locale=ja(?=")/g)[0].replace(/&amp;/g, `&`);
}

// For db.yugioh-cards
function getCardDesc(doc)
{
	let start = 6 + doc.indexOf(`</div>`, doc.indexOf(`<b>カードテキスト`));
	let end = doc.indexOf(`</div>`, start);
	return doc.substring(start, end);
}
*/
