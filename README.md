
# NHL Hub

Your one-stop hub for team, player, and live game statistics in the NHL. Stay up-to-date with comprehensive team performance insights, track individual player stats, and get real-time score updates during live games.

## Authors

- [@MitchRose976](https://github.com/MitchRose976)


## Tech Stack

**Client:** React, TypeScript, Redux Toolkit (RTK Query), Mongoose, Material UI, Recharts

**Server:** Node, TypeScript, MongoDB, Express, Nodemon, Toad Scheduler


## Features

- Live score tracking
![nhl hub live score](https://github.com/MitchRose976/nhl_app/assets/76877877/c48df5b0-9718-4d47-8979-54ddcff34e6d)

- Pre-game matchup info and statistics
![nhl hub pre game matchup](https://github.com/MitchRose976/nhl_app/assets/76877877/ff936367-81b7-4317-a54f-cd54f1f1624b)

- Top 5 points and goals tracker for last 5 games
![nhl hub top 5 in last 5](https://github.com/MitchRose976/nhl_app/assets/76877877/e2813506-d7f1-43d4-bdc8-12aee6a81b90)

- League standings
![nhl hub standings](https://github.com/MitchRose976/nhl_app/assets/76877877/16665145-803a-4205-92f7-ee8ad974a9b9)

- Team statistics 
![nhl hub team stats](https://github.com/MitchRose976/nhl_app/assets/76877877/9dd7ff16-00be-45bb-8477-c175c4648d43)

- Top 10 player and goalie statistics
![nhl hub player stats](https://github.com/MitchRose976/nhl_app/assets/76877877/9f5684f6-3639-4717-ab1e-a664e7f41d78)


## API Reference

#### Get todays games and scores

```http
  GET /nhl-app/games/scores
```


#### Get team stats

```http
  GET /nhl-app/teams/stats/formatted
```

#### Get standings

```http
  GET /nhl-app/teams/standings
```

### Player Stats Top 10
#### Get top 10 points

```http
  GET /nhl-app/players/top10Points
```

#### Get top 10 goals

```http
  GET /nhl-app/players/top10goals
```

#### Get top 10 assists

```http
  GET /nhl-app/players/top10assists
```

#### Get top 10 +/-

```http
  GET /nhl-app/players/top10PlusMinus
```

#### Get top 10 penalty minutes

```http
  GET /nhl-app/players/top10PenaltyMinutes
```

#### Get top 10 time on ice per game

```http
  GET /nhl-app/players/top10TimeOnIcePerGame
```

#### Get top 10 powerplay goals

```http
  GET /nhl-app/players/top10PowerplayGoals
```

#### Get top 10 shorthanded goals

```http
  GET /nhl-app/players/top10ShortHandedGoals
```

#### Get top 10 powerplay points

```http
  GET /nhl-app/players/top10PowerplayPoints
```

#### Get top 10 shorthanded points

```http
  GET /nhl-app/players/top10ShortHandedPoints
```

#### Get top 10 ot goals

```http
  GET /nhl-app/players/top10OtGoals
```

#### Get top 10 faceoff percentage

```http
  GET /nhl-app/players/top10FaceOffPercentage
```

#### Get top 10 shooting percentage

```http
  GET /nhl-app/players/top10ShootingPercentage
```

#### Get top 10 shots on net

```http
  GET /nhl-app/players/top10ShotsOnNet
```

#### Get top 10 game winning goals

```http
  GET /nhl-app/players/top10GameWinningGoals
```

### Goalie Stats Top 10
#### Get top 10 goalie wins

```http
  GET /nhl-app/players/top10Wins
```

#### Get top 10 goalie losses

```http
  GET /nhl-app/players/top10Losses
```

#### Get top 10 goalie save percentage

```http
  GET /nhl-app/players/top10SavePercentage
```

#### Get top 10 goalie shutouts

```http
  GET /nhl-app/players/top10Shutouts
```

#### Get top 10 goalie goals against average

```http
  GET /nhl-app/players/top10GoalsAgainstAverage
```

#### Get top 10 goalie games started

```http
  GET /nhl-app/players/top10GamesStarted
```
