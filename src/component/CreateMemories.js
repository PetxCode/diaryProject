import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import pix from "./gg.jpg";
import { useSelector } from "react-redux";

const CreateMemories = () => {
	const user = useSelector((state) => state.currentUser);
	const id = user._id;

	const navigate = useNavigate();
	const [image, setImage] = useState(pix);
	const [avatar, setAvatar] = useState("");

	const formSchema = yup.object().shape({
		title: yup.string().required("This field cannot be empty"),
		message: yup.string().required("This field cannot be empty"),
	});

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(formSchema),
	});

	const handleImage = (e) => {
		const file = e.target.files[0];
		const save = URL.createObjectURL(file);
		setImage(save);
		setAvatar(file);
	};

	const onSubmit = handleSubmit(async (value) => {
		console.log(value);
		const { message, title } = value;
		const path = "http://localhost:2331";
		const url = `${path}/api/diary/${id}`;

		const formData = new FormData();
		formData.append("title", title);
		formData.append("message", message);
		formData.append("memory", avatar);

		const config = {
			"content-type": "multipart/form-data",
			onUploadProgress: (ProgressEvent) => {
				const { loaded, total } = ProgressEvent;
				const percent = Math.floor((loaded * 100) / total);
				console.log(percent);
			},
		};

		const options = {
			onUploadProgress: (ProgressEvent) => {
				const { loaded, total } = ProgressEvent;
				const percent = Math.floor((loaded * 100) / total);
				console.log(percent);
			},
		};

		await axios.post(url, formData, config).then((res) => {
			console.log("Error Data: ", res);
		});

		navigate("/");
	});

	return (
		<Container>
			<Wrapper>
				<Card>
					<ImageHolder>
						<Image src={image} />
						<ImageLabel htmlFor="pix">Upload your Image</ImageLabel>
						<ImageInput
							id="pix"
							onChange={handleImage}
							type="file"
							accept="image/*"
						/>
					</ImageHolder>

					<Form onSubmit={onSubmit}>
						<Holder>
							<Label>Title</Label>
							<Input placeholder="Title" {...register("title")} />
							<Error>Error</Error>
						</Holder>

						<Holder>
							<Label>Message</Label>
							<InputArea placeholder="Message" {...register("message")} />
							<Error>Error</Error>
						</Holder>

						<Button>Create Memory</Button>
					</Form>
				</Card>
			</Wrapper>
		</Container>
	);
};

export default CreateMemories;

const Span = styled(Link)`
	margin-left: 5px;
	text-decoration: none;
	color: darkorange;
	cursor: pointer;
`;

const Div = styled.div`
	display: flex;
	margin-top: 10px;
`;

const Button = styled.button`
	width: 80%;
	margin-top: 30px;
	height: 40px;
	font-family: Poppins;
	font-size: 20px;
	text-transform: uppercase;
	color: white;
	font-weight: 300;
	outline: none;
	border: 0;
	background-color: #004080;

	transition: all 350ms;
	:hover {
		cursor: pointer;
		transform: scale(1.01);
	}
`;

const Error = styled.div`
	color: red;
	font-weight: 500;
	font-size: 12px;
`;

const InputArea = styled.textarea`
	width: 100%;
	height: 150px;
	border-radius: 3px;
	padding-left: 5px;

	resize: none;
	::placeholder {
		font-family: Poppins;
	}
	border: 1px solid silver;
	outline: none;
`;

const Input = styled.input`
	width: 100%;
	height: 30px;
	border-radius: 3px;
	padding-left: 5px;
	::placeholder {
		font-family: Poppins;
	}
	border: 1px solid silver;
	outline: none;
`;

const Label = styled.label`
	font-weight: 500;
`;

const Holder = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	align-items: flex-start;
	margin-top: 10px;
`;

const Form = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 28px;
`;

const ImageInput = styled.input`
	display: none;
`;

const ImageLabel = styled.label`
	padding: 10px 20px;
	background-color: #004080;
	color: white;
	border-radius: 3px;
	transition: all 350ms;
	:hover {
		cursor: pointer;
		transform: scale(1.01);
	}
`;

const ImageHolder = styled.div`
	width: 100%;
	align-items: center;
	display: flex;
	flex-direction: column;
`;

const Image = styled.img`
	width: 300px;
	height: 200px;
	object-fit: cover;
	border-radius: 5px;
	background-color: darkorange;
	margin-bottom: 20px;

	transition: all 350ms;
	:hover {
		cursor: pointer;
		transform: scale(1.02);
	}
`;

const Card = styled.div`
	box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
		rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
	width: 500px;
	min-height: 650px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	padding: 20px 0;
	flex-direction: column;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	justify-content: center;
	display: flex;
	align-items: center;
`;

const Container = styled.div`
	width: 100%;
	height: calc(100vh - 70px);
	padding-top: 70px;
`;
