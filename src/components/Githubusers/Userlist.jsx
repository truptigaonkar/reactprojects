import React from 'react';
import {
  Typography, Card, CardActionArea, CardActions, CardContent, CardMedia,
} from '@material-ui/core';

const Userlist = (props) => {
  const {
    cardShow, avatarUrl, login, name, location, htmlUrl, publicRepos, followers,
  } = props;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {cardShow
                    && (
                    <Card style={{
                      width: 300,
                    }}
                    >
                      <CardActionArea>
                        <CardMedia
                          style={{ height: 300 }}
                          image={avatarUrl}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {login}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            <div>
                              <b>Name:</b>
                              {name}
                            </div>
                            <div>
                              <b>Location:</b>
                              {' '}
                              {location}
                            </div>
                            <div>
                              <b>GitHhb url:</b>
                              <a href={`${htmlUrl}`} rel="noopener noreferrer">
                                {' '}
                                {/* use noopener noreferrer for target="_blank" */}
                                {htmlUrl}
                              </a>
                            </div>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <b>Repositories: </b>
                        {publicRepos}
                        <b>Followers: </b>
                        {' '}
                        {followers}
                      </CardActions>
                    </Card>
                    )}
      </div>

    </div>
  );
};

export default Userlist;
