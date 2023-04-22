import {useState, useEffect} from "react";

export function useFetchData({ fetcher, initialData}) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);

    function refetch() {
        setLoading(true);
        fetcher()
            .then((data) => {
                console.log("then")
                setData(data);
            })
            .catch((err) => {
                console.log("error")
                setError(err);
            })
            .finally(() => {
                console.log("finally")
                setLoading(false);
            });
    }
        useEffect(() => {
            refetch()
        }, []);

    return { data, error, loading, refetch };
}