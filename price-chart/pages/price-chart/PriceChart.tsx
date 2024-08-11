import React, { useEffect, useState } from "react";
import { TBinanceCoin, TSocketResponse } from "../../types";

type Props = {};

export const PriceChartPage = (props: Props) => {
  const [data, setData] = useState<TBinanceCoin>();
  const apiKey = process.env.API_KEY;
  const stockSymbol: string[] = [
    "BINANCE:BTCUSDT",
    // "BINANCE:LTCUSDT",
    // "BINANCE:BNBUSDT",
  ];
  const requestInterval = 5000;

  useEffect(() => {
    const ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

    const sendSubscriptionRequest = () => {
      stockSymbol.forEach((s) => {
        ws.send(JSON.stringify({ type: "subscribe", symbol: s }));
      });
    };

    ws.onopen = () => {
      sendSubscriptionRequest();
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "trade") {
        setData(data.data[0]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (err) => {
      console.log("WebSocket error: ", err);
    };

    return () => {
      stockSymbol.forEach((s) => {
        ws.send(JSON.stringify({ type: "unsubcribe", symbol: s }));
      });
      ws.close();
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "24px" }}>
        <p style={{ fontWeight: 700 }}>Title</p>
        <p>Price</p>
        <p>Symbol</p>
        <p>Time</p>
        <p>Volume</p>
      </div>
      <div>
        <p style={{ fontWeight: 700 }}>Value</p>
        {data && (
          <>
            <p>{data.p}</p>
            <p>{data.s.replace("BINANCE:", "").replace("USDT", "-USDT")}</p>
            <p>{new Date(data.t).toISOString()}</p>
            <p>{data.v}</p>
          </>
        )}
      </div>
    </div>
  );
};
