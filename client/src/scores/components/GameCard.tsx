import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

const nhlLogoUrl =
  "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/";

const GameCard = () => {
  const [logos, setLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const renderTeamLogo = (svgString: string) => {
    console.log("mitch svgString: ", svgString);
    return svgString !== "" ? (
      <svg width="50" height="50">
        <image
          href={`${svgString}`}
          // src={`${svgString}`}
          width="50"
          height="50"
        />
      </svg>
    ) : null;
  };

  useEffect(() => {
    setLoading(true);
    const numOfTeams = 30;
    let teamLogosUrls = [];
    for (let i = 0; i < numOfTeams; i++) {
      // push all team logo urls to array
      if (i + 1 !== 11 && i + 1 !== 27) {
        const logoRequest = axios.get(`${nhlLogoUrl}${i + 1}.svg`);
        teamLogosUrls.push(logoRequest);
      }
    }
    axios
      .all(teamLogosUrls)
      .then((response: AxiosResponse<any, any>[]) => {
        let teamLogos: string[] = [];
        response.forEach((logo) => {
          teamLogos.push(logo.config.url ? logo.config.url : "");
        });
        setLogos(teamLogos);
      })
      .catch((error) => console.log("mitch error: ", error));
    setLoading(false);
  }, []);

  const sxFlexBoxProps = {
    // border: "1px solid blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10px",
    //padding: '0px 8px'
  };

  return !loading ? (
    <Card
      raised
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* {console.log('mitch teamLogos: ', logos)} */}
      <CardHeader title="" subheader="P1 - 16:31" sx={{paddingTop: '10px', paddingBottom: '0'}}/>
      <CardContent sx={{...sxFlexBoxProps}}>
        {logos[0] && renderTeamLogo(logos[0])} 3 - 1{" "}
        {logos[1] && renderTeamLogo(logos[1])}
      </CardContent>
      {/* {console.log("mitch logo 1", logos[1])} */}
      {/* <CardActions></CardActions> */}
    </Card>
  ) : null;
};

export default GameCard;

/*
<Card sx={{ maxWidth: 345 }}>
<CardHeader
  avatar={
    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
      R
    </Avatar>
  }
  action={
    <IconButton aria-label="settings">
      <MoreVertIcon />
    </IconButton>
  }
  title="Shrimp and Chorizo Paella"
  subheader="September 14, 2016"
/>
<CardMedia
  component="img"
  height="194"
  image="/static/images/cards/paella.jpg"
  alt="Paella dish"
/>
<CardContent>
  <Typography variant="body2" color="text.secondary">
    This impressive paella is a perfect party dish and a fun meal to cook
    together with your guests. Add 1 cup of frozen peas along with the mussels,
    if you like.
  </Typography>
</CardContent>
<CardActions disableSpacing>
  <IconButton aria-label="add to favorites">
    <FavoriteIcon />
  </IconButton>
  <IconButton aria-label="share">
    <ShareIcon />
  </IconButton>
  <ExpandMore
    expand={expanded}
    onClick={handleExpandClick}
    aria-expanded={expanded}
    aria-label="show more"
  >
    <ExpandMoreIcon />
  </ExpandMore>
</CardActions>
<Collapse in={expanded} timeout="auto" unmountOnExit>
  <CardContent>
    <Typography paragraph>Method:</Typography>
    <Typography paragraph>
      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
      aside for 10 minutes.
    </Typography>
    <Typography paragraph>
      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
      medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
      occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
      large plate and set aside, leaving chicken and chorizo in the pan. Add
      pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
      stirring often until thickened and fragrant, about 10 minutes. Add
      saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
    </Typography>
    <Typography paragraph>
      Add rice and stir very gently to distribute. Top with artichokes and
      peppers, and cook without stirring, until most of the liquid is absorbed,
      15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
      mussels, tucking them down into the rice, and cook again without
      stirring, until mussels have opened and rice is just tender, 5 to 7
      minutes more. (Discard any mussels that don&apos;t open.)
    </Typography>
    <Typography>
      Set aside off of the heat to let rest for 10 minutes, and then serve.
    </Typography>
  </CardContent>
</Collapse>
</Card>
*/
