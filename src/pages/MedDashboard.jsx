import React,{useEffect,useState} from "react";
import MedData from "../components/meddata.jsx";
import axios from "axios";

function MedDashboard()
{
    const [list, setList] = useState([]);

    useEffect(() => {
        retrieveList()
    }, [])

    function retrieveList() {
        axios.get("http://localhost:5000/med")
            .then((res) => {
                setList(res.data)
                console.log(list);
            }).catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className="contacts">
            {list.map((item)=>{
                return(<MedData 
                    name={item.name}
                    description={item.description}
                    expirydate={item.exp_date}
                    quantity={item.quantity}
                    purchasedate={item.purchase_date}
                    price={item.price}
    
                />)
            })}            
        </div>
    )
}

export default MedDashboard