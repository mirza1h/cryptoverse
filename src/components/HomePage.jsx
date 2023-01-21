import { Typography, Row, Col, Statistic, Spin } from "antd";
import React from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import millify from "millify";
import { Cryptocurrencies } from "./Cryptocurrencies";
import { News } from "./News";

export const HomePage = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10);
  const globalData = data?.data?.stats;
  if (isFetching) return <Spin />;
  console.log(error);

  return (
    <>
      <Typography.Title level={2} className="heading">
        Global Crypto stats
      </Typography.Title>
      <Row>
        <Col span="12">
          <Statistic
            title="Total Cryptocurrencies"
            value={globalData.totalCoins}
          />
        </Col>
        <Col span="12">
          <Statistic
            title="Total Exchanges"
            value={globalData.totalExchanges}
          />
        </Col>
        <Col span="12">
          <Statistic
            title="Total Market Cap"
            value={millify(globalData.totalMarketCap)}
          />
        </Col>
        <Col span="12">
          <Statistic
            title="Total 24h Volume"
            value={millify(globalData.total24hVolume)}
          />
        </Col>
        <Col span="12">
          <Statistic title="Total Markets" value={globalData.totalMarkets} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title className="home-title" level={2}>
          Top 10 cryptocurrencies
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Typography.Title className="home-title" level={2}>
          Latest crypto news
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Typography.Title>
      </div>
      <News simplified />
    </>
  );
};
