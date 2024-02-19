
# NHL Hub

Your one-stop hub for team, player, and live game statistics in the NHL. Stay up-to-date with comprehensive team performance insights, track individual player stats, and get real-time score updates during live games.

## Authors

- [@MitchRose976](https://github.com/MitchRose976)


## Tech Stack

**Client:** React, TypeScript, Redux Toolkit (RTK Query), Mongoose, Material UI, Recharts

**Server:** Node, TypeScript, MongoDB, Express, Nodemon, Toad Scheduler


## Features

- Live score tracking
![App Screenshot](https://1drv.ms/i/s!AowlbbcXWk5EisRu0SajulVJ9r9duw?e=XPCy5h)
- Pre-game matchup info and statistics
![App Screenshot](https://1drv.ms/i/s!AowlbbcXWk5EisRxAjGsxO74-LHxgg?e=syqixK)
- Top 5 points and goals tracker for last 5 games
![App Screenshot](https://1drv.ms/i/s!AowlbbcXWk5EisR1jA2P7fdihqOc2g?e=OMywaD)
- League standings
![App Screenshot](https://1drv.ms/i/s!AowlbbcXWk5EisRzQuvHm6N27sJ-Pw?e=DbTxEP)
- Team statistics 
![App Screenshot](https://1drv.ms/i/s!AowlbbcXWk5EisR052qLLPWQT4s4wg?e=CwF8mc)
- Top 10 player and goalie statistics
![App Screenshot](https://1drv.ms/i/s!AowlbbcXWk5EisRwBIIon2BNYgkmMw?e=BihmoO)


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