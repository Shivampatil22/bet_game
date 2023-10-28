
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';


const CreateBet = () => {
  const [senderName, setSenderName] = useState('');
  const [senderResponse, setSenderResponse] = useState('');
  const [senderNumber, setNumber] = useState(12345);
  const [receiverName, setReceiverName] = useState('');
  const [receiverResponse, setReceiverResponse] = useState('');
  const [receiverNumber, setReceiverNumber] = useState();
  const [criteria, setCriteria] = useState('');
  const [resolDate, setResolDate] = useState('');
  const [wager, setWager] = useState('');

  const [status, setStatus] = useState('pending');
  const [senderFinalResp, setSenderFinalResp] = useState('NIL');
  const [receiverFinalResp, setReceiverFinalResp] = useState('NIL');

  const [error, setError] = useState(false);
  
  

  const sendResp = async () => {
    try {
      const response = await Axios.post(`http://localhost:5500/api/sendmessage`);
      
      console.log('Response:', response.data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const navigate = useNavigate();

  const initiateBet = async () => {
    if (!senderName || !senderResponse || !senderNumber || !receiverName || !receiverResponse || !receiverNumber || !criteria || !resolDate || !wager) {
      setError(true);
      return false; //Empty values provided
    }

    if (isNaN(receiverNumber)) {
      setError(true);
      return false; // ReceiverNumber is not a valid number
    }    

    if((senderResponse==="YES" && receiverResponse==="YES") || (senderResponse==="NO" && receiverResponse==="NO")){
      alert('Responses of both entities cannot be same');
      return false;
    }
  
    const betData = {
      senderName,
      senderResponse,
      senderNumber,
      receiverName,
      receiverResponse,
      receiverNumber,
      criteria,
      resolDate,
      wager,
      status,
      senderFinalResp,
      receiverFinalResp,
    };

    try {
      const response = await Axios.post('http://localhost:5500/api/createbet', betData);

      if (response.status === 200) {
    //calling the send response api after posting new bet to get the bet confirmation from the counterparty.
        sendResp();
        console.log('Bet created successfully', response.data);
      } else {
        console.error('Error creating bet', response.status, response.data);
      }
    } catch (error) {
      console.error('An error occurred while creating the bet', error);
    }
    
    

    console.warn(senderName, senderResponse, senderNumber, receiverName, receiverResponse, receiverNumber, criteria, resolDate, wager, status);
  };

    
      useEffect(() => {
        // if (!localStorage.getItem("token")) {
        //   navigate("/");
        // }
      }, []);

  return (

    <div className='w-screen h-full flex justify-center bg-slate-950 flex-col items-center'>
      <Nav username={"Shivam"}/>
      <div className="w-full max-w-md p-8 m-4 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold mb-4">Initiate Bet</h1>
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left"
            htmlFor="initName"
          >
            Initiator Name
          </label>
          <input
            type="text"
            id="senderName"
            placeholder="Enter initiator's name"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />

          {error && !senderName && <span className="text-red-500 text-left">Enter a valid name</span>}

        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
            Initiator Response
          </label>

          <div className="flex items-start"> 


            <div className="mr-2">
              <label>
                <input
                  type="radio"
                  name="senderResponse"
                  value="Option 1"

                  checked={senderResponse === "YES"}
                  onChange={() => setSenderResponse("YES")}
                  className='mr-1'

                />
                YES
              </label>
            </div>
            <div className="mr-2">
              <label>
                <input
                  type="radio"
                  name="senderResponse"
                  value="Option 2"

                  checked={senderResponse === "NO"}
                  onChange={() => setSenderResponse("NO")}
                  className='ml-3 mr-1'

                />
                NO
              </label>
            </div>
          </div>

          {error && !senderResponse && <span className="text-red-500 text-left">Select a response</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="receiverName">

            Counterparty Name
          </label>
          <input
            type="text"
            id="receiverName"
            placeholder="Enter counterparty's name"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />

          {error && !receiverName && <span className="text-red-500 text-left">Enter a valid name</span>}

        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
            Counterparty Response
          </label>
          <div className="flex items-start">
            {" "}
            {/* Align options to the left */}
            <div className="mr-2">
              <label>
                <input
                  type="radio"
                  name="receiverResponse"
                  value="Option A"
                  checked={receiverResponse === "YES"}
                  onChange={() => setReceiverResponse("YES")}
                  className='mr-1'

                />
                YES
              </label>
            </div>
            <div className="mr-2">
              <label>
                <input
                  type="radio"
                  name="receiverResponse"
                  value="Option B"

                  checked={receiverResponse === "NO"}
                  onChange={() => setReceiverResponse("NO")}
                  className='ml-3 mr-1'

                />
                NO
              </label>
            </div>
          </div>
          {error && !receiverResponse && <span className="text-red-500 text-left">Select a response</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="wager">
            Counterparty Phone Number
          </label>
          <input
            type="text"
            id="receiverNumber"
            placeholder="Enter Counterparty Number"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={receiverNumber}
            onChange={(e) => setReceiverNumber(e.target.value)}
          />
          {error && (!receiverNumber || (isNaN(receiverNumber)) ) && <span className="text-red-500 text-left">Enter a valid Phone number</span>}

        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left"
            htmlFor="criteria"
          >
            Criteria
          </label>
          <textarea
            type="text"
            id="criteria"
            placeholder="Enter criteria"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          />
          {error && !criteria && (
            <span className="text-red-500 text-left">Enter valid criteria</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left"
            htmlFor="resolDate"
          >
            Resolution Date
          </label>
          <input
            type="datetime-local"
            id="resolDate"
            placeholder="Enter resolution date"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={resolDate}
            onChange={(e) => setResolDate(e.target.value)}
          />

          {error && (!resolDate) && <span className="text-red-500 text-left">Enter a valid date</span>}

        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left"
            htmlFor="wager"
          >
            Wager
          </label>
          <input
            type="text"
            id="wager"
            placeholder="Enter wager"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={wager}
            onChange={(e) => setWager(e.target.value)}
          />
          {error && !wager && (
            <span className="text-red-500 text-left">Enter a valid wager</span>
          )}
        </div>

        <button
          onClick={initiateBet}
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover-bg-blue-600 w-full"
        >
          Initiate Bet
        </button>
      </div>
    </div>
  );
};

export default CreateBet;
