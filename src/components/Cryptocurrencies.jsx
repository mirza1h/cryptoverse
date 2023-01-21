import React, { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Spin, Card, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";
import { millify } from "millify";

export const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [coins, setCoins] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().startsWith(searchTerm)
    );
    setCoins(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Spin />;

  return (
    <>
      <div className="search-crypto" hidden={simplified}>
        <Input
          placeholder="Search cryptocurrencies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Row gutter={[16, 16]} className="crypto-card-container">
        {coins?.map((coin) => {
          return (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
              <Link to={`/crypto/${coin.uuid}`}>
                <Card
                  title={`${coin.rank}. ${coin.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      src={coin.iconUrl}
                      alt="crypto icon"
                    />
                  }
                  hoverable
                >
                  <p>Price: {millify(coin.price)}</p>
                  <p>Market cap: {millify(coin.marketCap)}</p>
                  <p>Daily change: {coin.change}</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
