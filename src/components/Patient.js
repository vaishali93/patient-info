import { useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import ReactSlider from 'react-slider';
import { getAge } from '../utilities/dateUtilities';

const URL = 'https://hapi.fhir.org/baseR4/Patient?_pretty=true&_format=json';

const Patient = () => {
    const { isLoading, patientData } = useFetchData(URL);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(patientData);
    },[patientData]);

    const handleFilterByAge = (slider) => {
        const min = slider[0];
        const max = slider[1];
        const filterByAge = patientData.filter(({resource}) => {
            return getAge(resource.birthDate) <=max && getAge(resource.birthDate) >= min;
        });
        setFilteredData(filterByAge);
    }

    return(
        <div className="patient-table">
            {isLoading && <span>Loading.....</span>}
            {!isLoading && 
                <>
                    <div className="filter">
                        <span>Filter By Age</span>
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            defaultValue={[1, 100]}
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                            pearling
                            minDistance={10}
                            onChange={(min,max) => handleFilterByAge(min, max)}
                        />
                    </div>
                    <table>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>BirthDate</th>
                        <th>Address</th>
                        <th>Phone</th>
                        {
                            filteredData &&  (
                                filteredData.map((data) => {
                                    let country = data.resource.address && data.resource.address[0].city;
                                    let phone = data.resource.telecom && data.resource.telecom[0].value;
                                    return (
                                        <>
                                            <tr>
                                                <td>{data.resource.id}</td>
                                                <td>{data.resource.name[0].given[0] + " " + data.resource.name[0].family}</td>
                                                <td>{data.resource.gender || '-'}</td>
                                                <td>{data.resource.birthDate || '-'}</td>
                                                <td>{country || '-'}</td>
                                                <td>{phone || '-'}</td>
                                            </tr>
                                        </>
                                    )
                                })
                                
                            )
                        }
                    </table>
                </>
            }
        </div>
    )
};

export default Patient;