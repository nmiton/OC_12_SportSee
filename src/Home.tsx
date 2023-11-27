import React from "react";
import { GlobalStyles } from "./GlobalStyles";

import useData from "./hooks/useData";
import { useParams } from "react-router-dom";

import Header from "./components/Header/Header";
import SideBar from "./components/Sidebar/Siderbar";
import Title from "./components/Title/Title";
import ChartBar from "./components/ChartBar/CharBar";
import ChartRadar from "./components/ChartRadar/ChartRadar";
import ChartScore from "./components/ChartScore/ChartScore";
import ChartLine from "./components/ChartLine/ChartLine";
import CardStat from "./components/CardStat/Stats";

export default function Home() {
	const { id } = useParams();
	const userID: number = id ? parseInt(id) : 0;

	const [data, loading, error] = useData(userID);
	
	return (
		<>
			<GlobalStyles />
			<Header />
			{loading ?
				<div className="loading"></div>
				: error ? <div className="error">Erreur lors de la recherche des données...</div> :
					<div className="main-container">
						<Title text="Bonjour" textColor={data["userInfos"]['firstName']} subText={"Félicitation ! Vous avez explosé vos objectifs hier 👏"} />

						<div className="home-container">
							<div className="left-container">
								<ChartBar data={data["sessionsWeight"]} />
								<div className="cards-container">
									<ChartLine data={data["sessionsLength"]} />
									<ChartRadar data={data["data"]} />
									<ChartScore score={data["todayScore"]} />
								</div>
							</div>

							<div className="right-container">
								<CardStat type="Calories" weight={data['keyData']['calorieCount']} />
								<CardStat type="Proteines" weight={data['keyData']['proteinCount']} />
								<CardStat type="Glucides" weight={data['keyData']['carbohydrateCount']} />
								<CardStat type="Lipides" weight={data['keyData']['lipidCount']} />
							</div>
						</div>

					</div>}

			<SideBar />
		</>
	);
};

