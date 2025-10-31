import { useState } from 'react'

const App = () => {


  //I might use ai just to create my array of articles
  const [articles, setArticles] = useState([
    {
      "title": "Digital Banking and the Future of Cashless Economies",
      "paragraph": "Digital banking is accelerating the shift from physical currency to mobile payments and online financial services. As technology integrates deeper into daily transactions, cash usage continues to decline in favor of secure, fast, and accessible digital systems.",
      "day_of_production": "2024-01-10"
    },
    {
      "title": "Behavioral Biases That Affect Investment Decisions",
      "paragraph": "Investors often make decisions driven by emotions and cognitive biases rather than rational thinking. Common behaviors like overconfidence, herd mentality, and loss aversion significantly influence financial markets and personal portfolios.",
      "day_of_production": "2024-02-05"
    },
    {
      "title": "FinTech Growth in Emerging Countries",
      "paragraph": "Financial technology has become a key tool in providing banking access to previously underserved populations. Innovative platforms are helping millions participate in the global economy without traditional banking infrastructure.",
      "day_of_production": "2024-03-01"
    },
    {
      "title": "Cryptocurrency Regulation and Market Stability",
      "paragraph": "As cryptocurrencies gain popularity, global regulators are working to establish frameworks that encourage innovation while protecting investors. Regulation is expected to reduce volatility and promote long-term adoption.",
      "day_of_production": "2024-01-22"
    },
    {
      "title": "Sustainable Investing and ESG Strategies",
      "paragraph": "Environmental, Social, and Governance (ESG) investing has emerged as a powerful trend, influencing corporate behavior and long-term investment strategies. Investors are increasingly prioritizing ethical and sustainable practices.",
      "day_of_production": "2024-02-14"
    },
    {
      "title": "Artificial Intelligence in Financial Fraud Detection",
      "paragraph": "AI systems are transforming fraud detection by analyzing large datasets in real-time. These tools help financial institutions identify suspicious activity faster and reduce financial crime risks.",
      "day_of_production": "2024-03-10"
    },
    {
      "title": "Global Inflation Trends and Consumer Spending",
      "paragraph": "Rising inflation rates affect purchasing power and market behaviors worldwide. Analysts expect central banks to adjust monetary policies to stabilize economies and support growth.",
      "day_of_production": "2024-01-18"
    },
    {
      "title": "The Rise of Robo-Advisors in Wealth Management",
      "paragraph": "Automated investment platforms are democratizing access to financial planning by offering low-cost, personalized investment strategies. Their growth reflects increasing trust in technology-based financial services.",
      "day_of_production": "2024-02-28"
    },
    {
      "title": "Cybersecurity Challenges in Online Banking",
      "paragraph": "As banks adopt advanced digital systems, cybersecurity threats have also grown. Institutions are investing heavily in security technology and user education to prevent data breaches.",
      "day_of_production": "2024-03-05"
    },
    {
      "title": "Gamified Learning and Financial Literacy",
      "paragraph": "Gamified learning platforms help students and young adults understand complex financial concepts through interactive activities, rewards, and simulations, making financial education engaging and accessible.",
      "day_of_production": "2024-01-30"
    }
  ]
  )
  const [search,setSearch] = useState('')
  const [results,setResults] = useState([])  //where the results will be stored

  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')


  //I will make my function all in one
  const handleSearch = (e) =>{
    if (e.key === 'Enter') {
      const value = e.target.value.trim(); // to clean the spaces at the beginning of the search
      setSearch(value);

      if (!value) { // no value found
        setResults([])
        return;
      }

      const lower = value.toLowerCase()
      const filtered = articles
        .filter(({ title, paragraph }) => (`${title} ${paragraph}`).toLowerCase().includes(lower)) // since we can apply toLowerCase to an object we devided the object into the strign so we look in the title then in the para
        .map((article) => {
          const safe = escapeRegExp(value)
          const regex = new RegExp(`(${safe})`, 'gi')
          return {
            ...article,
            titleHighlighted: article.title.replace(regex, '<mark>$1</mark>'),
            paragraphHighlighted: article.paragraph.replace(regex, '<mark>$1</mark>'),
          }
        })

      setResults(filtered)
    }
  }

  return (
    <div>
        <h2 className='text-2xl font-bold'>Search</h2>  
        <input className='w-full p-4 text-base mb-4'
         type="text"
        placeholder='search'
        onKeyDown={handleSearch} />

        {
          search && (
            <p className='mb-4 text-base font-bold'>{results.length} articles found with "{search}"</p>
          )
        }
        <div>
          {
            results.map((item,index)=>(
              <div key={index} className='mb-4 p-4 border rounded-md'>
                <h3 className='text-lg font-bold' dangerouslySetInnerHTML={{ __html: item.titleHighlighted || item.title }} />
                <p className='text-sm text-gray-500'>{item.day_of_production}</p>
                <p className='text-base' dangerouslySetInnerHTML={{ __html: item.paragraphHighlighted || item.paragraph }} />
              </div>
            )
          )}
        </div>
    </div>
  )
}

export default App