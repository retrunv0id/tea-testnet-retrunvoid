import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "../src/App.css";
import { Container } from "react-bootstrap";

const App = () => {
  const [currenciesInfo] = useState([
    {
      titleName: "✹(BTC):",
      ws: "wss://stream.binance.com:9443/ws/btcusdt@trade",
      imgAlt: "bitcoin",
    },
    {
      titleName: "✹(ETH):",
      ws: "wss://stream.binance.com:9443/ws/ethusdt@trade",
      imgAlt: "ethereum",
    },
    {
      titleName: "✹(BNB):",
      ws: "wss://stream.binance.com:9443/ws/bnbusdt@trade",
      imgAlt: "binance-coin",
    },
    {
      titleName: "✹(Polygon):",
      ws: "wss://stream.binance.com:9443/ws/maticusdt@trade",
      imgAlt: "matic",
    },
    {
      titleName: "✹(DOGE):",
      ws: "wss://stream.binance.com:9443/ws/dogeusdt@trade",
      imgAlt: "dogecoin",
    },
    {
      titleName: "✹(SOL):",
      ws: "wss://stream.binance.com:9443/ws/solusdt@trade",
      imgAlt: "solana",
    },
  ]);

  useEffect(() => {
    const comparePrice = (price, prevPrice, output) => {
      if (price > prevPrice) {
        output.classList.add("green");
        output.classList.remove("red");
      } else if (price < prevPrice) {
        output.classList.add("red");
        output.classList.remove("green");
      } else {
        output.classList.remove("green");
        output.classList.remove("red");
      }
    };

    const fetchData = () => {
      for (const currency of currenciesInfo) {
        const ws = new WebSocket(currency.ws);
        let prevPrice = null;

        ws.onmessage = (e) => {
          const stockObj = JSON.parse(e.data);
          let price = parseFloat(stockObj.p);
          if (price > 10) {
            price = price.toFixed(2);
          } else {
            price = price.toFixed(4);
          }
          const outputList = document.querySelectorAll(
            `[data-output="${currency.imgAlt}"]`
          );
          outputList.forEach((outputItem) => {
            outputItem.textContent = `${price} $`;
            comparePrice(
              price,
              parseFloat(outputItem.dataset.prevPrice),
              outputItem
            );
            outputItem.dataset.prevPrice = price;
          });
        };
        ws.onerror = (e) => {
          console.error(`WebSocket error for ${currency.imgAlt}`, e);
        };
      }
    };
    fetchData();

    return () => {
      // Clean up WebSocket connections
    };
  }, [currenciesInfo]);

  return (
    <>
      <div className="intro">
        <div className="container">
          <div className="keyboard">
            <span className="key">R</span>
            <span className="key">e</span>
            <span className="key">t</span>
            <span className="key">r</span>
            <span className="key">u</span>
            <span className="key">n</span>
            <span className="key">v</span>
            <span className="key">o</span>
            <span className="key">i</span>
            <span className="key">d</span>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <h3>-</h3>
          <div className="row">
            <div className="col-md-8 about-text-content">
              <p>
                • Community Manager • Community Moderator • Developer • Beta
                tester
              </p>
              <p>
                I'm a web3 creator with React JS methods and JavaScript skills I
                ran several testnets by combining web and blockchain with
                various blockchain networks such as networks: ARTENA, KYOTO,
                BSC, POLYGON, ARB, OP create a discord bot for the price of a
                token using a VPS that runs 24 hours and updates real-time price
                data for each token testnets that I develop such as build web3,
                node, smart contracts Nice to meet you
              </p>
            </div>
            <div className="col-sm-4">
              <img
                src="./src/retrunvoid.jpg"
                className="img-thumbnail rounded-circle custom-img"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div >
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <Card style={{ width: "20rem" }} className="mx-auto mb-3">
              <Card.Body>
                <Card.Title>Price</Card.Title>
                <table className="crypto-rate mx-auto responsive">
                  <tbody>
                    {currenciesInfo.map((currency) => (
                      <tr key={currency.imgAlt} className="crypto-rate__item">
                        <td className="crypto-rate__item-content">
                          <h3 className="crypto-rate__item-title">
                            {currency.titleName}
                          </h3>
                        </td>
                        <td
                          className="crypto-rate__item-course"
                          data-output={currency.imgAlt}
                        ></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src="https://alternative.me/crypto/fear-and-greed-index.png"
              alt="Latest Crypto Fear & Greed Index"
              style={{ margin: "10px", maxWidth: "70%" }}
            />
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default App;
