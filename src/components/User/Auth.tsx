import React from "react";
import { useActions } from "../../hooks/useActions";
import { Spin, Form, Input, Button, Checkbox, Typography } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Auth = () => {

    const { fetchAppUserLogin } = useActions();
    const user = useTypedSelector(state => state.app.user);
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<null | string>(null);

    const onFinish = (values: any) => {
        setLoading(true);

        fetchAppUserLogin(
            values,
            () => {
                setError(null);
                navigate("/");
            },
            (e: any, message: string) => {
                setError(message);
                form.setFields([
                    { name: "email", validating: false, errors: [""] },
                    { name: "password", validating: false, errors: [""] },
                ]);
            },
            () => {
                setLoading(false);
            }
        );
    };

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    // };

    React.useEffect(() => {
        if (user) return navigate("/");
    }, []);

    return <div className="flex justify-center items-center h-screen">

        <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>

            <Form
                form={form}
                name="auth"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelAlign="left"
                className="relative"
            >

                <Typography.Title level={3} className="text-center mb-4">??????????????????????</Typography.Title>

                <div className="mb-6" />

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "?????????????? email" }]}
                >
                    <Input type="email" className="rounded" placeholder="?????? email" />
                </Form.Item>

                <Form.Item
                    label="????????????"
                    name="password"
                    rules={[{ required: true, message: "?????????????? ???????? ????????????" }]}
                >
                    <Input.Password className="rounded" placeholder="?????????????? ????????????" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" className="mb-2">
                    <Checkbox>?????????????????? ????????</Checkbox>
                </Form.Item>

                <div className="text-center">
                    <Button htmlType="submit" className="rounded" block>??????????</Button>
                </div>

                {!loading && error && <div className="absolute text-red-500 font-bold -bottom-10">{error}</div>}

            </Form>

        </Spin>

    </div>

}

export default Auth;