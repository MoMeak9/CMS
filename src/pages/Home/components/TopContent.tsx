import * as React from 'react';
import './index.scss'
import {Row, Col} from "antd";
import {
    HomeOutlined,
} from '@ant-design/icons';


type Props = {};
export const TopContent = (props: Props) => {
    return (
        <Row gutter={16}>
            <Col span={6}>
                <div className={"top-tag"}>
                    <div className={"top-icon"}>
                        <HomeOutlined/>
                    </div>
                    <div className={"top-number"}>
                        111
                    </div>
                </div>
            </Col>
            <Col span={6}>
                <div className={"top-tag"}>
                    <div className={"top-icon"}>
                        <HomeOutlined/>
                    </div>
                    <div className={"top-number"}>
                        111
                    </div>
                </div>
            </Col>
            <Col span={6}>
                <div className={"top-tag"}>
                    <div className={"top-icon"}>
                        <HomeOutlined/>
                    </div>
                    <div className={"top-number"}>
                        111
                    </div>
                </div>
            </Col>
            <Col span={6}>
                <div className={"top-tag"}>
                    <div className={"top-icon"}>
                        <HomeOutlined/>
                    </div>
                    <div className={"top-number"}>
                        111
                    </div>
                </div>
            </Col>
        </Row>
    );
};
