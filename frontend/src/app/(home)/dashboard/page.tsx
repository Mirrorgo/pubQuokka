"use client";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import styles from "./index.module.scss";
type Notes = {
  date: string;
  type: string;
};

type DataSet = {
  lastEditDate: string;
  type: string;
  owner: string;
  size: number;
  comments: { text: string; author: string }[];
};

const { Title } = Typography;

function DashBoard() {
  const [unreadNotes, setUnreadNotes] = useState<Notes[]>([
    {
      date: "13/09/2023",
      type: "Blood Oxygen Saturation",
    },
    {
      date: "12/09/2023",
      type: "Electrocardiography",
    },
  ]);
  const [isDataSetsHidden, setIsDataSetsHidden] = useState(false);
  const [datasets, setDatasets] = useState<DataSet[]>([
    {
      lastEditDate: "13/09/2023",
      type: "Blood Oxygen Saturation",
      owner: "Jack",
      size: 1000,
      comments: [{ text: "test comment1", author: "author1" }],
    },
    {
      lastEditDate: "12/09/2023",
      type: "Electrocardiography",
      owner: "Tom",
      size: 1500,
      comments: [],
    },
  ]);
  return (
    <div>
      <Title level={2}>DashBoard</Title>
      <Space direction="vertical" className={styles["margin-content"]}>
        {/* <Row gutter={20}>
          <Col span={6}>
            <Title level={4}>Notes</Title>
          </Col>
          <Col span={15}>
            <Title level={4}>You have {unreadNotes.length} unread notes</Title>
          </Col>
          <Col span={3}>
            <Button type="primary">View All</Button>
          </Col>
        </Row>
        <Card>
          <Row gutter={20}>
            {unreadNotes.map((cur, idx) => (
              <Col key={idx}>
                <Card className={styles.unreadNotes}>
                  <div>New Dataset have been added</div>
                  <div>TYPE: {cur.type}</div>
                  <div>{cur.date}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card> */}
        <Row gutter={20}>
          <Col span={6}>
            <Title level={4}>Datasets</Title>
          </Col>
          <Col span={15}>
            <Title level={4}>You have {datasets.length} datasets</Title>
          </Col>
          <Col span={3}>
            <Button
              type="primary"
              onClick={() => {
                setIsDataSetsHidden((cur) => !cur);
              }}
            >
              {isDataSetsHidden ? "Show" : "Hide"}
            </Button>
          </Col>
        </Row>
        {isDataSetsHidden || (
          <Card>
            <Space direction="vertical">
              {datasets.map((cur, idx) => (
                <Card key={idx} className={styles.dataSet}>
                  <div>TYPE: {cur.type}</div>
                  <div>Last edit: {cur.lastEditDate}</div>
                  <div>Dataset size: {cur.size}</div>
                  <div>Dataset owner: {cur.owner}</div>
                  <div className={styles.comments}>
                    Comments
                    {/* TODO */}
                    {cur.comments.length > 0 ? (
                      cur.comments.map((comment, commentIdx) => (
                        <div key={commentIdx} className={styles.comment}>
                          {comment.text} by {comment.author}
                        </div>
                      ))
                    ) : (
                      <div>No comments available</div>
                    )}
                  </div>
                  <Row justify="space-evenly">
                    <Col>
                      <Button>Share the Data Set</Button>
                    </Col>
                    <Col>
                      <Button>More details</Button>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
          </Card>
        )}
      </Space>
    </div>
  );
}

export default DashBoard;
