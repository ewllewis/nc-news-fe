import { useState, useEffect } from "react";

function useLoading(dataFetchFunc, searchTerm) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    dataFetchFunc(searchTerm)
      .then((fetchedData) => {
        setData(fetchedData || []);
        setIsLoading(false);
        setError(null);
      })
      .catch(() => {
        setIsLoading(false);
        setError({ message: "Error fetching data" });
        setData([]);
      });
  }, [searchTerm]);

  return { isLoading, error, data };
}

export default useLoading;
