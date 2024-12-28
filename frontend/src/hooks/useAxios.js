import { useEffect, useState } from "react";

const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();


  const axiosupdatedFetch = async (configObj) => {
    const { axiosInstance, method, url, reqConfig = {} , headers = {} } = configObj;


    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...reqConfig,
        headers,
        signal: ctrl.signal,
      });
      setResponse(res.data);
      setError("");
    } catch (error) {
      setResponse([]);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading  , axiosupdatedFetch];
};

export default useAxios;