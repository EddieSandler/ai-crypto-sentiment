import React, { useEffect, useState } from "react";

interface TokenInfo {
  name: string;
  price: string;
  marketCap: string;
  volume24h: string;
  change24h: string;
}

const TokenInfoCard: React.FC<{ projectName: string }> = ({ projectName }) => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${projectName}&tsyms=USD`, {
          headers: {
            'Authorization': `01165d1e453c3e743afc0eca2cf41d95926250749bc5f3abcf6c289a20eebb84` // Replace with actual API key if needed
          }
          marketCap: tokenData.MKTCAP || "N/A",
          volume24h: tokenData.VOLUME24HOURTO || "N/A",
          change24h: tokenData.CHANGE24HOUR || "N/A",
        });
        const data = await response.json();
        console.log("API Response:", data); // Log the response to check the structure
        const tokenData = data.DISPLAY[projectName]?.USD || {};
        setTokenInfo({
          name: projectName,
          price: tokenData.PRICE || "N/A",
          chartUrl: "", // CryptoCompare API does not provide a chart URL directly
        });
      } catch (error) {
        console.error("Error fetching token info:", error);
      }
    };

    if (projectName) {
      fetchTokenInfo();
    }
  }, [projectName]);

  if (!tokenInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-4">
      <h2 className="text-xl font-bold">{tokenInfo.name}</h2>
      <p>Price: ${tokenInfo.price}</p>
      <p>Market Cap: {tokenInfo.marketCap}</p>
      <p>24h Volume: {tokenInfo.volume24h}</p>
      <p>24h Change: {tokenInfo.change24h}</p>
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-md">
        <p>Chart placeholder</p>
      </div>
    </div>
  );
};

export default TokenInfoCard;
