import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiTwotoneDelete } from "react-icons/ai";
import pix from "./gg.jpg";
import axios from "axios";

const HomeScreen = () => {
	const [getData, setGetData] = useState([]);

	const onGetData = async () => {
		try {
			const url = "http://localhost:2331/api/user/saved";

			await axios.get(url).then((res) => {
				setGetData(res.data.data);
			});

			console.log(getData);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		onGetData();
	}, [getData]);

	return (
		<Container>
			<Wrapper>
				{getData &&
					getData?.map((props) => (
						<div>
							{props.diary.map((props) => (
								<Card key={props._id}>
									<Image src={props.image} />

									<TextHolder>
										<Holder>
											<Title>{props.title}</Title>
											<Icon />
										</Holder>
										<Message>Message</Message>
									</TextHolder>
								</Card>
							))}
						</div>
					))}
			</Wrapper>
		</Container>
	);
};

export default HomeScreen;

const Icon = styled(AiTwotoneDelete)`
	color: red;
	font-size: 25px;
	transition: all 350ms;
	transform: scale(1);
	transform-origin: center;
	:hover {
		cursor: pointer;
		transform: scale(1.01);
	}
`;
const Holder = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Message = styled.div`
	color: gray;
`;

const Title = styled.div`
	text-transform: uppercase;
	font-weight: 500;
`;

const TextHolder = styled.div`
	padding: 5px 10px;
`;

const Image = styled.img`
	width: 100%;
	height: 200px;
	object-fit: cover;
	background-color: darkorange;
`;

const Card = styled.div`
	margin: 10px;
	width: 300px;
	height: 320px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
`;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding-top: 40px;
`;

const Container = styled.div`
	padding-top: 70px;
	width: 100%;
	min-height: calc(100vh - 70px);
	height: 100%;
`;
