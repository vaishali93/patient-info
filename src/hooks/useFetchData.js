import { useEffect, useState } from "react";

const useFetchData = (URL) => {
    const [isLoading, setIsLoading] = useState(false);
    const [patientData, setPatientData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetchData(URL);
    }, [URL]);

    const fetchData = async(url) => {
        try{
            const response = await fetch(url);
            const data = await response.json();
            setPatientData(data.entry);
            setIsLoading(false);
        }
        catch{
            setIsLoading(false);
        }
    }

    return {isLoading, patientData};
}

export default useFetchData;