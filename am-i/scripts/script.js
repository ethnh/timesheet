import { ethers } from "./ether.js";

const myDiv = document.getElementById("textcontainer");
const promptDiv = document.getElementById("ticker");
document.addEventListener("DOMContentLoaded", async function () {
  const AtTheStudioABI = [
    {
      inputs: [],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bool",
          name: "status",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "time",
          type: "uint256",
        },
      ],
      name: "Update",
      type: "event",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presence",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "statement",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const otherDiv = document.getElementById("datacontainer");
  const linkDiv1 = document.getElementById("link1");
  const linkDiv2 = document.getElementById("link2");
  const linkDiv3 = document.getElementById("link3");
  const linkDiv4 = document.getElementById("link4");

  const tempChange = document.createElement("span");

  const AtTheStudioADDRESS = "0xaf6c153972fbc7d67feaa9f9d1d08f3c13f79773";
  const provider = new ethers.providers.JsonRpcProvider(
    "https://optimism-mainnet.infura.io/v3/9715c9bf2b9c47109c84cabf0fbcaae5"
  );
  const AtTheStudioContract = new ethers.Contract(
    AtTheStudioADDRESS,
    AtTheStudioABI,
    provider
  );

  var statement = await AtTheStudioContract.statement();

  function updateDiv() {
    function statementDiv() {
      // statement from blockchain
      myDiv.innerHTML = statement + ".";
      function tickerDiv() {
        // add&remove class to display buttons and ticker
        promptDiv.classList.remove("no-dis");
        promptDiv.classList.add("teleprompt");
        function buttonDiv1() {
          linkDiv1.classList.remove("no-dis");
          linkDiv1.classList.add("my-link");
          function buttonDiv2() {
            linkDiv2.classList.remove("no-dis");
            linkDiv2.classList.add("consecutive-link");
            linkDiv4.classList.remove("no-dis");
            linkDiv4.classList.add("weather-link");
            function buttonDiv3() {
              linkDiv3.classList.remove("no-dis");
              linkDiv3.classList.add("blockchain-link");
            }
            setTimeout(buttonDiv3, 1111);
          }
          setTimeout(buttonDiv2, 1111);
        }
        setTimeout(buttonDiv1, 1111);
      }
      setTimeout(tickerDiv, 1111);
    }
    setTimeout(statementDiv, 2222);
    myDiv.classList.remove("bottom-left");
    myDiv.classList.add("flex-item");
    myDiv.innerHTML = "At this moment...";
  }

  setTimeout(updateDiv, 3333);
  var myRequest = new Request("present.txt");
  fetch(myRequest).then(function (response) {
    return response.text().then(function (text) {
      const txt_lines = text.split(/\r?\n/);
      const date_time = txt_lines[0].split(" ");
      const timestmp = date_time.splice(-1);
      const datestmp = date_time.splice(-2);
      const temperature = txt_lines[2].split(" ");
      const past = temperature[0];
      const change = temperature[1];
      if (statement == "I am at the studio") {
        myDiv.classList.add("present");
        if (Math.sign(change) === -1) {
          otherDiv.innerHTML =
            "Indoor temperature was " +
            past +
            "\u00B0C at " +
            timestmp +
            " when I arrived";
          otherDiv.innerHTML += " \u2014 " + change * -1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("warmer");
          tempChange.innerHTML = "warmer";
          otherDiv.innerHTML += " than last recorded temperature";
          otherDiv.innerHTML +=
            " \u2014 Get the <a href='https://vincent.charlebois.info/weather'>full weather report</a>.";
          otherDiv.innerHTML +=
            "                                                       ";
        } else if (Math.sign(change) === 1) {
          otherDiv.innerHTML =
            "Indoor temperature was " +
            past +
            "\u00B0C at " +
            timestmp +
            " when I arrived";
          otherDiv.innerHTML += " \u2014 " + change * 1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("cooler");
          tempChange.innerHTML = "cooler";
          otherDiv.innerHTML += " than last recorded temperature";
          otherDiv.innerHTML +=
            " \u2014 Get the <a href='https://vincent.charlebois.info/weather'>full weather report</a>.";
          otherDiv.innerHTML +=
            "                                                       ";
        }
      } else {
        myDiv.classList.add("absent");
        if (Math.sign(change) === -1) {
          otherDiv.innerHTML =
            "Indoor temperature was " + past + "\u00B0C when I left at " + timestmp + " on " + datestmp[1];
          otherDiv.innerHTML += " \u2014 " + change * -1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("warmer");
          tempChange.innerHTML = "warmer";
          otherDiv.innerHTML += " than when I arrived";
          otherDiv.innerHTML +=
            " \u2014 The studio is only one of many places where art gets made.";
          otherDiv.innerHTML +=
            "                                                       ";
        } else if (Math.sign(change) === 1) {
          otherDiv.innerHTML =
            "Indoor temperature was " + past + "\u00B0C when I left at " + timestmp + " on " + datestmp[1];
          otherDiv.innerHTML += " \u2014 " + change * 1 + "\u00B0C ";
          otherDiv.appendChild(tempChange);
          tempChange.classList.add("cooler");
          tempChange.innerHTML = "cooler";
          otherDiv.innerHTML += " than when I arrived";
          otherDiv.innerHTML +=
            " \u2014 The studio is only one of many places where art gets made.";
          otherDiv.innerHTML +=
            "                                                       ";
        }
      }
    });
  });

  console.log(statement);
});
