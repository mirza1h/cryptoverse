import React from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { Spin, Row, Col, Card, Typography, Avatar } from "antd";
import moment from "moment/moment";

export const News = ({ simplified }) => {
  const count = simplified ? 4 : 12;
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count,
  });

  if (isFetching) return <Spin />;

  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  return (
    <>
      <Row gutter={[16, 16]}>
        {cryptoNews.value.map((article, index) => {
          return (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card hoverable className="news-card">
                <a href={article.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Typography.Title className="news-title" level={4}>
                      {article.name}
                    </Typography.Title>
                    <img
                      src={article.image?.thumbnail?.contentUrl || demoImage}
                      alt="news-thumbnail"
                    />
                  </div>
                  <p>
                    {article.description.length > 100
                      ? `${article.description.substr(0, 100)} ...`
                      : article.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar
                        src={
                          article.provider[0]?.image?.thumbnail?.contentUrl ||
                          demoImage
                        }
                        alt=""
                      />
                      <Typography.Text className="provider-name">
                        {article.provider[0]?.name}
                      </Typography.Text>
                    </div>
                    <Typography.Text>
                      {moment(article.datePublished).startOf("ss").fromNow()}
                    </Typography.Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
