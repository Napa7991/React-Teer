import React, { useEffect, useState } from "react";
import "./Style.css"

const Component = () => {
  // let arr = [0,1,2,3,4,5,6,7,8,9];
  let arr = Array.from({ length: 10 }, (_, index) => index);
  const [selectedNumber, setSelectedNumber] = useState([]);

  // to selectNumber
  const selectNumber = (number) => {
    let numberDiv = document.querySelectorAll(".elementClass");
    numberDiv.forEach((numberClass) => {
      let numberDiv = parseInt(numberClass.textContent);
      if (number === numberDiv) {
        numberClass.classList.add("active");
      }
    });
    setSelectedNumber((prevSelectedNumber) => [...prevSelectedNumber, number]);
  };

  async function checkLimit(selectedNumber) {
    let limitID = document.getElementById("limitID");
    try {
      const res = await fetch(
        "http://localhost:8080/api/lottery/check-limits",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedNumber),
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        data.forEach((item) => {
          console.log(`Number : ${item.number}`);
          console.log(`Limit : ${item.limit}`);
          limitID.innerText = item.limit;
        });
      } else {
        console.log(`Error in else`);
      }
    } catch (error) {
      console.log(`Error inside catch : ${error}`);
    }
  }



  return (
    <>
      <h1>Choose element : </h1>
      <div className="main-container">
        {arr.map((number, index) => (
          <div
            key={index}
            className="elementClass"
            id="elementID"
            onClick={() => selectNumber(number)}
          >
            {number}
          </div>
        ))}
      </div>
      <h4>Selected Number : {`${selectedNumber} `}</h4>
      <button onClick={() => checkLimit(selectedNumber)}>
        Check Limits :{" "}
      </button>
      <h4>
        Limit is : <span id="limitID"></span>
      </h4>
      <h5>It is storing data in array format and sending data in array format</h5>
    </>
  );
};

export default Component;
