import React from 'react';
import {Button, DatePicker, Form, Input, Modal} from "antd";
import {addEvent, updateEvent} from "../API server/event";
import moment from "moment";

const AddEventModal = ({ dispatch, isModalOpen, setIsModalOpen, initialEvent, setInitialEvent }) => {
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setInitialEvent({});
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setInitialEvent({});
    };
    const onFinish = values => {
        if ((initialEvent !== undefined)){
            const newValues = {
                ...values,
                _id: initialEvent._id,
            };
            dispatch(updateEvent(newValues));
            handleOk();
        }
        dispatch(addEvent(values));
        handleOk();
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add event
            </Button>
            <Modal
                title="Add event"
                open={isModalOpen}
                footer={false}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    preserve={false}
                    name="event"
                    labelCol={{
                        span: 20,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        dateEvent: moment(initialEvent?.date),
                        title: initialEvent?.title,
                        description: initialEvent?.description,
                        organizer: initialEvent?.organizer,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Organizer"
                        name="organizer"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your organizer!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Date of event"
                        name="dateEvent"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your date of event!',
                            },
                        ]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddEventModal;