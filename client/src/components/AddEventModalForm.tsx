import React, {FC, useCallback} from 'react';
import {Button, DatePicker, Form, Input, Modal} from "antd";
import {addEvent, updateEvent} from "../store/reducers/actionCreators";
import {useAppDispatch} from "../hooks/redux";
import {IEvent} from "../models/IEvents";
import isEmpty from 'lodash/isEmpty';

interface AddEventModalFormProps {
    isModalOpen: boolean;
    initialEvent: IEvent;
    title: string;
    setIsModalOpen: (isOpen: boolean) => void;
    handleOk: () => void;
    setInitialEvent: (event: IEvent) => void;
}

const AddEventModalForm:FC<AddEventModalFormProps> = ({
        isModalOpen,
        handleOk,
        initialEvent,
        title,
        setIsModalOpen,
        setInitialEvent,
    }) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm<IEvent>();
console.log(initialEvent);
    const onFinish = (values: IEvent) => {
        if (!isEmpty(initialEvent)){
            const newEvent: IEvent = {...values, _id: initialEvent._id}
            dispatch(updateEvent(newEvent))
        }else {
            dispatch(addEvent(values));
        }
        handleCancel();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setInitialEvent({} as IEvent);
        form.resetFields();
    };

    return (
        <>
            <Modal
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    form={form}
                    name="Add event"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        title: initialEvent.title,
                        description: initialEvent.description,
                        dateEvent: initialEvent.dateEvent,
                        organizer: initialEvent.organizer,
                    }}
                    onFinish={onFinish}
                    preserve={false}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Sescription"
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
                        label="Date event"
                        name="dateEvent"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your date event!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="Organizer"
                        name="organizer"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your date organizer!',
                            },
                        ]}
                    >
                        <Input />
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

export default AddEventModalForm;