import {Row, Col, Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import PlayerTable from "../components/PlayerTable";
const MCServerPlayer = () => {
    return (
        <Layout className="layout">
            <Content>
                <Row>
                    <Col span={24}>
                        玩家总数
                    </Col>
                    <Col span={24}>
                        在线玩家数
                    </Col>
                    <Col span={24}>
                        被封禁玩家
                    </Col>
                </Row>
            </Content>
            <Layout>
                <Content>
                    <PlayerTable></PlayerTable>
                </Content>
                <Footer>
                    ssss
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MCServerPlayer;
