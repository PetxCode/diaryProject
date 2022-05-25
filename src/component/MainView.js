import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import pix from "./gg.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addBest, addBestMemories, addMomery } from "./GlobalState";
import moment from "moment";

const MainView = () => {
	const dispatch = useDispatch();
	const [getData, setGetData] = useState([]);
	const user = useSelector((state) => state.currentUser);
	const memo = useSelector((state) => state.memories);

	const id = user._id;

	const onGetData = async () => {
		try {
			const mainRoute = "http://localhost:2331";
			const url = `${mainRoute}/api/diary/${id}`;

			await axios.get(url).then((res) => {
				// setGetData(res.data.data);
				dispatch(addMomery(res.data.data.diary));
			});

			console.log(getData);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		onGetData();
	}, []);

	return (
		<Container>
			<Wrapper>
				{memo?.map((props) => (
					<Card key={props._id}>
						<Image src={props.image} />

						<TextHolder>
							<Holder>
								<Title>{props.title}</Title>
								<Icon />
							</Holder>
							<Message>{props.message}</Message>
							<Space />
							<Holder1>
								<Date>{moment(props.createdAt).format("LT")}</Date>
								<Button
									onClick={() => {
										dispatch(addBestMemories(props));
									}}
								>
									Fav
								</Button>
							</Holder1>
						</TextHolder>
					</Card>
				))}
			</Wrapper>
		</Container>
	);
};

export default MainView;

const Button = styled.div`
	transition: all 350ms;
	color: white;
	text-decoration: none;
	background-color: darkorange;
	padding: 5px 15px;

	:hover {
		cursor: pointer;
		transform: scale(1.02);
	}
`;

const Date = styled.div`
	font-weight: 500;
	font-size: 13px;
`;

const Icon = styled(AiFillEdit)`
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
const Space = styled.div`
	margin: 10px 0;
`;
const Holder1 = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;
const Holder = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Message = styled.div`
	color: gray;
	font-size: 13px;
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
	min-height: 320px;
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
