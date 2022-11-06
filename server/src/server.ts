import express, {Application, Request, Response} from 'express';
// import formatYearMonthDay from '../utils/formatYearMonthDay.ts';

const server: Application = express();
const port: number = 7000;

/* 
'https://statsapi.web.nhl.com/api/v1/';
Documentation: Stats and analytics

Teams
/teams = all teams in League
/teams/id = info for specific team
/teams/id/stats = stats in current season (use splits key to get specific stats)
/teams/id/roster = show full roster for team (this includes individual player ids used to get player stats)
/teams/id?expand=team.roster = does same as above

Players
/people/id = basic player info (name, number, birthday, age, height, weight, position)
/people/id/stats?stats=statsSingleSeason&season=20182019 = stats for specific season


League
/divisions = get all divisions
/divisions/(17, 16, 15, 18) = specific division
/conferences = all conferences
/conferences/(5, 6) = specific conference
/schedule = schedule for games

Standings
/standings = get standings for each team individually including active streaks (w6, l3 etc.), goals for and against (broken down by division)
*/

/*
https://nhl-game-tracker-app.herokuapp.com/api/items/players/top10assists
Documentation: custom endpoint example for top10Assissts
*/


/*
`https://nhl-score-api.herokuapp.com/api/scores?startDate=${currentDay}&endDate=${currentDay}`;
Documentation for live games
use this to set date range: currentDay = formatYearMonthDay(new Date());
*/


/*
`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.id}.svg`
Documentation: team logos
*/

server.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
});

// server.get()

server.listen(port, () => {
    console.log(`Connected successfully on: http://localhost:${port}`)
});