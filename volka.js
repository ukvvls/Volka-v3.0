export const currencyList = ['USD','EUR','GBP','EGP','JPY','CAD','AUD','CHF','CNY','AED','SAR','TRY','INR','KWD','QAR'];

export async function convertCurrency(amount, from, to) {
  if (from === to) return { result: Number(amount), date: new Date().toISOString().slice(0,10) };
  const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(from)}&symbols=${encodeURIComponent(to)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Exchange-rate service is unavailable');
  const data = await response.json();
  return { result: Number(amount) * data.rates[to], date: data.date };
}

export async function fetchFinancialNews() {
  const url = 'https://api.gdeltproject.org/api/v2/doc/doc?query=(finance%20OR%20markets%20OR%20economy)&mode=ArtList&format=json&sort=DateDesc&maxrecords=12';
  const response = await fetch(url);
  if (!response.ok) throw new Error('News feed unavailable');
  const data = await response.json();
  return (data.articles || []).map((article) => ({ title: article.title, url: article.url, source: article.domain, date: article.seendate }));
}

export const companyDirectory = [
  { name:'Apple', symbol:'AAPL', sector:'Technology', country:'United States', description:'Consumer technology and digital services.' },
  { name:'Microsoft', symbol:'MSFT', sector:'Technology', country:'United States', description:'Software, cloud, and AI services.' },
  { name:'NVIDIA', symbol:'NVDA', sector:'Semiconductors', country:'United States', description:'Accelerated computing and AI chips.' },
  { name:'Amazon', symbol:'AMZN', sector:'Consumer & Cloud', country:'United States', description:'E-commerce and cloud infrastructure.' },
  { name:'Alphabet', symbol:'GOOGL', sector:'Technology', country:'United States', description:'Digital platforms, search, and cloud.' },
  { name:'Tesla', symbol:'TSLA', sector:'Automotive', country:'United States', description:'Electric vehicles and energy products.' },
  { name:'Meta Platforms', symbol:'META', sector:'Technology', country:'United States', description:'Social platforms and digital advertising.' },
  { name:'Saudi Aramco', symbol:'2222.SR', sector:'Energy', country:'Saudi Arabia', description:'Integrated energy and chemicals company.' },
  { name:'JPMorgan Chase', symbol:'JPM', sector:'Banking', country:'United States', description:'Global banking and financial services.' },
  { name:'Coca-Cola', symbol:'KO', sector:'Consumer Staples', country:'United States', description:'Global beverage company.' },
  { name:'Toyota', symbol:'TM', sector:'Automotive', country:'Japan', description:'Global automotive manufacturer.' },
  { name:'Visa', symbol:'V', sector:'Financial Services', country:'United States', description:'Global payments network.' },
  { name:'Samsung Electronics', symbol:'005930.KS', sector:'Technology', country:'South Korea', description:'Electronics and semiconductor manufacturer.' },
  { name:'LVMH', symbol:'MC.PA', sector:'Luxury', country:'France', description:'Luxury goods group.' },
  { name:'ExxonMobil', symbol:'XOM', sector:'Energy', country:'United States', description:'Integrated oil and gas company.' },
  { name:'Berkshire Hathaway', symbol:'BRK.B', sector:'Investments', country:'United States', description:'Diversified holding company.' },
  { name:'Eli Lilly', symbol:'LLY', sector:'Healthcare', country:'United States', description:'Pharmaceutical company.' },
  { name:'ASML', symbol:'ASML', sector:'Semiconductors', country:'Netherlands', description:'Lithography systems supplier.' },
  { name:'Nestlé', symbol:'NESN.SW', sector:'Consumer Staples', country:'Switzerland', description:'Food and beverage company.' },
  { name:'Adobe', symbol:'ADBE', sector:'Software', country:'United States', description:'Creative and digital experience software.' }
];

export function answerLocalAssistant(prompt) {
  const q = prompt.toLowerCase();
  if (/(exchange|convert|currency|تحويل|عملة)/.test(q)) return 'Use the Currencies workspace to calculate a conversion from the latest available Frankfurter reference rates. Rates are not live tick-by-tick market prices.';
  if (/(news|خبر|اخبار)/.test(q)) return 'Open News to view the financial headlines feed. Each item links to its original publisher so you can verify context.';
  if (/(stock|share|market|سهم|أسهم|بورص)/.test(q)) return 'VOLKA is currently a dashboard shell. Stock quotes are not connected yet, so I will not invent a price or market movement. Check the Markets panel for connection status.';
  if (/(gold|oil|ذهب|نفط)/.test(q)) return 'Gold and oil feeds are not connected in this starter build. No current quote is displayed until a verified provider is integrated.';
  if (/(risk|invest|investment|استثمر|استثمار)/.test(q)) return 'I can explain financial concepts and help compare information, but this local starter assistant is not a personalized investment adviser. Consider risk, diversification, and reliable sources.';
  return 'I am VOLKA local assistant. I can guide you through currencies, company directory, news, and explain finance concepts. Market quotes for stocks, gold, and oil are not connected yet.';
}
