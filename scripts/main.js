const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1a00a39f9amsh57b63c28cfed523p1d62bejsn295f760a437d',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

const fun = async (movie) => {
  const res = await fetch('https://imdb8.p.rapidapi.com/auto-complete?q=breakingbad', options);
  const data = await res.json();
  console.log(data);
};  
/* fun(); */