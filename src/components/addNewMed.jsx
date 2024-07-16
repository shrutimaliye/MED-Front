import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Web3 from 'web3';
import { Buffer } from 'buffer';
import Contract from "../contract/constractABI.json"
import { ethers } from "ethers";
import { batches } from '../contract/contractCall';
import { useNavigate } from 'react-router-dom';
export default function AddMed(){
  const navigate=useNavigate();
    const [med,setMed]=useState({
        name:"",
        quantity:0,
        exp_date:"",
        price:0,
        batchID:"",
        manufacturer:""
    })
    const [account,setAccount]=useState("")

    function handleChange(event) {
      const { name, value } = event.target;
      setMed(prevValue => {
          return {
              ...prevValue,
              [name]: value
          };
      });
  }

  function handleSubmit(event) {
    console.log(med)
    axios.post('http://localhost:5000/med/',med).then((res)=>{
      console.log(res.data);
    })
    console.log(med)
    event.preventDefault()
  }

  function stringToBytes32(string) {
    // Pad the string if necessary
    let paddedString = string;
    console.log(paddedString.length)
    while (paddedString.length < 32) {
      paddedString += '\0';
    }
    console.log(paddedString.length)
    // Convert the string to bytes32
    const bytes32Value = Buffer.from(paddedString, 'utf8');
  
    return bytes32Value;
  }

  const {ethereum}=window;
  async function handleVerify(event)
  {
    event.preventDefault()
   
  
    const contractAbi = [
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_batchId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "_quantity",
            "type": "uint256"
          }
        ],
        "name": "addBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "batchId",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "manufacturer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          }
        ],
        "name": "NewBatchAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "batches",
        "outputs": [
          {
            "internalType": "address",
            "name": "manufacturer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "batchIds",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_batchId",
            "type": "bytes32"
          }
        ],
        "name": "getBatchDetails",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_batchId",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "_manufacturer",
            "type": "address"
          }
        ],
        "name": "verifyBatch",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]; // Insert your contract's ABI here
    const contractAddress = '0x99B5997E173D9Bd0cF9D071988DAfb6644f2f892'; // Insert your contract's address here
    const web3 = new Web3('https://endpoints.omniatech.io/v1/eth/sepolia/public'); // Replace with the actual RPC server URL
    

    const contract = await new web3.eth.Contract(contractAbi, contractAddress);
    
    // contract.methods.verifyBatch(med.batchID,'0x277E98450938C7751f656852040B41A6213ab82e')
    contract.methods.verifyBatch(med.batchID,'0x277E98450938C7751f656852040B41A6213ab82e')
      .call({from:'0x277E98450938C7751f656852040B41A6213ab82e'})
      // .call()
      .then(res => console.log(res))
      .catch(error => console.error(error));
    if(batches.includes(med.batchID)){
      console.log("Verified")
      alert("Medicines are authentic");
    }else{
      console.log("Counterfeited")
      alert("Counterfeited medicines")
      navigate('/MedDashboard');
    }
      
    }

    return(
   
        <Form className="lovw">
      <Form.Group className="mb-3">
        <Form.Label>Medicine Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" className="tish"  name="name"
                value={med.name}
                onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" placeholder="Enter quantity" className="fish" name="quantity"
        value={med.quantity} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Enter price" className="lish" name="price"
        value={med.price} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Expiration date</Form.Label>
        <Form.Control type="date" placeholder="Enter date of expiry" className="pish" name="exp_date"
        value={med.exp_date} onChange={handleChange} />
      </Form.Group>
      <div className='verify'>
        <div>
          <Form.Group className="mb-3">
            <Form.Label>Medicine manufacturer</Form.Label>
            <Form.Control type="text" placeholder="Enter name" className="tish"  name="manufacturer"
                    value={med.manufacturer}
                    onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>batchID</Form.Label>
            <Form.Control type="text" placeholder="Enter batchID" className="tish"  name="batchID"
                    value={med.batchID}
                    onChange={handleChange}/>
          </Form.Group>
          </div>
      <Button variant="primary" type="submit" onClick={handleVerify}>
        Verify
      </Button></div>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
   
    )
}
