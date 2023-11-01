import { prisma } from "~/server/db";
import { addScoresInput } from "./CustomTypes";

class Score {
	private teamScore;
	private teamName;
	private characterScores;

	constructor(ScoresInput: addScoresInput) {
		this.teamName = ScoresInput.teamName;
		this.teamScore = ScoresInput.teamScore;
		this.characterScores = ScoresInput.characterScores
	}
	async setTeamScore() {
		await prisma.team.update({
			where: {
				name: this.teamName,
			},
			data: {
				teamScore: this.teamScore,
			},
		});
	}

	async setCharacterScores(){
		try{
			this.characterScores.map(async character=>{
				await prisma.user.update({
					where:{
						
					}
				})
			})
		}
	}
}

export default Score;
