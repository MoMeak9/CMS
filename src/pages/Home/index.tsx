import './index.scss';
import {Layout, Breadcrumb, Row, Col, Card} from "antd";
import {TopContent} from "./components/TopContent";

const {Content} = Layout;
const Home = () => {
    const gutter = 16;
    return (
        <Layout className="layout home">
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
                <Row>
                    <Col span={24}>
                        <TopContent></TopContent>
                    </Col>
                </Row>
                <Row gutter={gutter} className={"row-content"}>
                    <Col span={12}>
                        <Card>

                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>

                        </Card>
                    </Col>
                </Row>
                <Row gutter={gutter} className={"row-content"}>
                    <Col span={12}>
                        <Card>

                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>

                        </Card>
                    </Col>
                </Row>
                <Row gutter={gutter} className={"row-content"}>
                    <Col span={12}>
                        <Card>

                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>

                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default Home
