import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { X, ChevronLeft, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Sumresult = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  // const [showBankOffers, setShowBankOffers] = useState(false);
  const [showOffers, setShowOffers] = useState(false);  // To toggle offer visibility


  const SENTIMENT_COLORS = {
    Positive: '#4ade80',
    Neutral: '#94a3b8',
    Negative: '#f87171'
  };

  const platformImages = {
    amazon: "ecom/amazon.webp",
    flipkart: "ecom/flipkart.webp",
    myntra: "ecom/myntra.jpg",
    vijaysales: "ecom/vijay.png",
    reliance: "ecom/reliancedi.png",
    sangeetha: "ecom/sangee.png",
    croma: "ecom/croma.png",
    unknown: "ecom/default.webp" // Fallback image for unknown platforms
  };
  

  const additionalSections = [
    // { id: "aggregate", title: "Aggregate Summary" },
    { id: "price", title: "Price Comparator" }
  ];

  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  const receivedMessage = location.state?.result || "No message received";
  const parsedData = isValidJSON(receivedMessage)
    ? JSON.parse(receivedMessage)?.results || []
    : [];
    const priceComparisonData = useMemo(() => 
      parsedData.map(item => ({
        platform: item.platform?.toUpperCase() || 'UNKNOWN',
        price: parseFloat(item.price || 0),
        title: item.title || 'No Title',
        image: item.image || 'No Image Available',
        link: item.link || 'No Link Available',
        reviews: item.reviews || [],
        offers: item.offers?.flat() || [],
        offersImages: item.offers_images || []
      })).filter(item => item.price > 0)
    , [parsedData]);
    

  const bankOffers = {
    AMAZON: [
      "10% Instant Discount on HDFC Bank Credit Cards",
      "No Cost EMI on select Credit Cards",
      "Special Cashback Offers"
    ],
    FLIPKART: [
      "5% Cashback on Axis Bank Credit Cards",
      "Instant Discount with Citi Bank Cards",
      "Zero Processing Fee on EMI"
    ],
    MYNTRA: [
      "Extra 10% Off with ICICI Bank Cards",
      "Instant Discount on SBI Credit Cards",
      "Special Weekend Offers"
    ]
  };
  
  
  const ProductCard = ({ data, expandedCard, setExpandedCard }) => {
    // Determine the platform image
    const platformImage =
      platformImages[data.platform?.toLowerCase()] || platformImages.unknown;
  
   
  
  const getSentimentScore = () => {
  // Check if the first review exists and has a valid score.
  if (!data.reviews?.[0]?.score) return null;
  return data.reviews[0].score * 100;
};

// Get the sentiment score safely
const sentimentScore = getSentimentScore();

// Safely map the reviews to sentimentData
const sentimentData =
  data.reviews?.map((review) => {
    // Ensure review.label and review.score are valid before processing
    if (!review || !review.label || review.score == null) {
      // Return default values if review data is missing or malformed //for the sentiment values to be null
      return { name: 'Unknown', value: 0 };
    }

    // Format the label and calculate the score as percentage
    const formattedLabel = review.label.charAt(0).toUpperCase() + review.label.slice(1);
    const score = Number((review.score * 100).toFixed(1));


    return {
      name: formattedLabel,
      value: score
    };
  }) || [];
    const isExpanded = expandedCard === data;
  
  const validPrice = !isNaN(data.price) && data.price > 0 ? data.price : 0;
  
    return (
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[400px] w-[300px]"
        onClick={() => setExpandedCard(isExpanded ? null : data)} // Toggle card expansion
      >
        {/* Collapsed State */}
        {!isExpanded && (
          <div className="h-1/2 w-full flex justify-center items-center bg-gray-100">
            <img
              src={platformImages[data.platform?.toLowerCase()] || "/api/placeholder/400/400"} //platfrom images
              alt={data.platform || "Unknown Platform"}
              className="w-48 h-48 object-contain"
            />
          </div>
        )}
  
        {/* Expanded State */}
        {isExpanded && sentimentScore && (
          <div className="flex justify-center items-center h-40 w-full bg-gray-100 rounded-lg p-4">
            <div className="w-full max-w-2xl">
              <ResponsiveContainer width="100%" height="200">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={index} fill={SENTIMENT_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
  
        {/* Card Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{data.platform}</h3>
          <p className="text-sm text-gray-700 mb-2 line-clamp-2">{data.title}</p>
          <p className="text-lg font-bold text-gray-900 mb-3">
            ₹{validPrice.toFixed(2)} {/* Ensure price is valid before displaying */}
          </p>
          {/* {data.offers?.length > 0 && (
            <p className="text-xs text-green-700 font-medium">
              Offers Available: {data.offers.join(", ")}
            </p>
          )} */}
          {/*  offers */}

        </div>
      </div>
    );
  };
  
  
  const Offers = ({ data }) => {
    // Check if there are offers available and render them
    if (!data || !data.offers || data.offers.length === 0) {
      return null; // No offers available
    }
  
    return (
      <p className="text-xs text-green-700 font-medium">
        Offers Available: {data.offers.join(", ")}
      </p>
    );
  };
  // <Offers data={data} />
  
  
  const renderPriceComparator = () => {
        return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
              <button
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setExpandedCard(null)}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back</span>
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setExpandedCard(null)}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Price Comparator</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Price Comparison Chart</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={priceComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="platform" />
                        <YAxis />
                        <RechartsTooltip 
                          formatter={(value, name) => [`₹${value}`, name === 'price' ? 'Price' : name]}
                        />
                        <Legend />
                        <Bar dataKey="price" fill="#8884d8" name="Product Price" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Detailed Price Breakdown</h3>
                    <table className="w-full text-left table-auto">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-3">Platform</th>
                          <th className="p-3">Price</th>
                          <th className="p-3">Product Title</th>
                          <th className="p-3">Actions</th>   {/*buy now ,bank offers */}
                        </tr>
                      </thead>
                      <tbody>
                      {priceComparisonData.map((item, index) => (
                          <div key={index} className="price-comparator-item">
                            <h3>{item.platform}</h3>
                            <p>{item.title}</p>
                            {/* Add more content as needed */}
                            
                            {/* Button to show offers */}
                            <button 
                              onClick={() => {
                                setSelectedPlatform(item.platform);  // Set the selected platform
                                setShowOffers(true);  // Toggle to show the offers for the clicked item
                              }}
                              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                            >
                              <CreditCard className="mr-2" size={16} /> Offers
                            </button>

                            {/* Render offers for the selected platform */}
                            {showOffers && selectedPlatform === item.platform && (
                              <Offers data={item} />    //{/* Pass the selected item data to the Offers component */}
                            )}
                          </div>
                        ))}

                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  
  const renderExpandedView = (data) => {
    const sentimentData = data.sentiment?.[0]?.map(item => ({
      name: item.label.charAt(0).toUpperCase() + item.label.slice(1),
      value: Number((item.score * 100).toFixed(1))
    })) || [];

    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
              <button
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setExpandedCard(null)}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back</span>
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setExpandedCard(null)}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <img
                      src={data.priceTitle?.[3] || "/api/placeholder/400/400"}
                      alt={data.platform}
                      className="w-full rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/400";
                      }}
                    />
                    
                    {sentimentData.length > 0 && (
                      <div className="mt-10 mr-10 p-2 bg-gray-50 rounded-lg ">{/*changes here for the size of piechart */}
                        <h4 className="font-semibold mb-3">Sentiment Analysis</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={sentimentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                // label={({ name, value }) => `${name}: ${value}%`}
                                // labelLine={true}  //for label line  -positive 95%.etc
                                >
                                {sentimentData.map((entry, index) => (
                                  <Cell key={index} fill={SENTIMENT_COLORS[entry.name] } />
                                ))}
                              </Pie>
                              <RechartsTooltip 
                                formatter={(value) => `${value}%`}
                              />
                              {/* <Legend verticalAlign="bottom" height={36} /> */} 
                              {/*for the lengds the score appears in bottom */}
                              <Legend 
                              verticalAlign="bottom" 
                              height={36} 
                              content={(props) => {
                                const { payload } = props;
                                return (
                                  <ul style={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
                                    {payload.map((entry, index) => (
                                      <li key={`item-${index}`} style={{ margin: '0 10px', listStyleType: 'none', fontSize: '14px' }}>
                                        <span style={{ color: entry.color, fontWeight: 'bold' }}>{entry.value}</span>: {entry.payload.value}%
                                      </li>
                                    ))}
                                  </ul>
                                );
                              }}
                            />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">{data.priceTitle?.[1]}</h2>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-2xl font-bold">₹{data.priceTitle?.[0]}</span>
                      <a 
                        href={data.priceTitle?.[2]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        View on {data.platform.toUpperCase()}   {/*view on a plotform.. */}
                      </a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold mb-3">Review Summary</h3>
                      <p className="text-gray-700 leading-relaxed">{data.review}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBankOffersModal = () => {
    if (!showOffers || !selectedPlatform) return null;
  
    // Log for debugging
    console.log("Selected Platform:", selectedPlatform);
    console.log("Bank Offers:", bankOffers[selectedPlatform]);
  
    const offersForSelectedPlatform = bankOffers[selectedPlatform];
  
    // Ensure that we have valid offers for the selected platform
    if (!offersForSelectedPlatform || offersForSelectedPlatform.length === 0) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowOffers(false)}
          />
          <div className="bg-white p-6 rounded-lg z-60 relative w-96">
            <button
              onClick={() => setShowOffers(false)}
              className="absolute top-2 right-2"
            >
              <X className="text-gray-600" />
            </button>
            <h2 className="text-xl font-bold mb-4">
              No kjhOffers Available for {selectedPlatform}
            </h2>
          </div>
        </div>
      );
    }
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setShowOffers(false)}
        />
        <div className="bg-white p-6 rounded-lg z-60 relative w-96">
          <button
            onClick={() => setShowOffers(false)}
            className="absolute top-2 right-2"
          >
            <X className="text-gray-600" />
          </button>
          <h2 className="text-xl font-bold mb-4">
            Bank Offers - {selectedPlatform}
          </h2>
          <ul className="space-y-2">
            {offersForSelectedPlatform.map((offer, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded">
                {/* Assuming each offer has a `data` field */}
                <Offers data={offer} /> {/* Display the offers here */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  

  
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-10 mb-6">
          {parsedData.map((data, index) => (
            <ProductCard key={index} data={data} />
          ))}
        </div>
        <div className="flex justify-center gap-6">
          {additionalSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[250px] w-[400px]"
              onClick={() => setExpandedCard({ id: section.id, title: section.title })}
            >
              <div className="p-4">
                <h3 className="text-center font-bold">{section.title}</h3>
              </div>
            </div>
          ))}
        </div>
        {expandedCard && (
          expandedCard.id === "price" ? 
            renderPriceComparator() : 
            renderExpandedView(expandedCard)
        )}
        {renderBankOffersModal()}
      </div>
    </div>
  );
};

export default Sumresult;



//offers and images code

 {/* Offers Section */}
 {offers.length > 0 && (
  <div className="bg-gray-50 rounded-lg p-4 mb-6">
    <h3 className="font-semibold mb-3">Available Offers</h3>
    <ul className="list-disc list-inside text-gray-700">
      {offers.map((offer, index) => (
        <li key={index}>{offer}</li>
      ))}
    </ul>
  </div>
)}

{/* Offers Images */}
{offersImages.length > 0 && (
  <div className="mb-6">
    <h3 className="font-semibold mb-3">Offer Images</h3>
    <div className="grid grid-cols-3 gap-4">
      {offersImages.map((img, index) => (
        <img 
          key={index} 
          src={img} 
          alt={`Offer ${index + 1}`} 
          className="rounded-lg shadow-md object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/200/200";
          }}
        />
      ))}
    </div>
  </div>
)}
