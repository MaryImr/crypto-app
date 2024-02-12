import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment'; 

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const count = simplified ? 6 : 12;
  const { data: CryptoNews } = useGetCryptoNewsQuery();

  if (!CryptoNews?.data) return 'Loading...';

  return (
    <Row gutter={[ 24, 24 ]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder="Select a Cryptocurrency"
            optionFilterProp='children'
            onChange={(value) => (console.log(value))}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >

          </Select>
        </Col>
      )}
      {CryptoNews.data.slice(0, count).map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target='_blank' rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.thumbnail || demoImage} alt="news" />
              </div>
              <p>{news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className='provider-container'>
                <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News