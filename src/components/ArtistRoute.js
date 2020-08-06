import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from "styled-components";

import { fetchArtistInfo } from "../helpers/api-helpers";
import { largeNumberFormatter } from "../utils/utils";

import PlayButton from "react-play-button";

import {
  requestAllArtistInfo,
  receiveArtistProfile,
  receiveTopTracks,
  receiveAllArtistInfo,
  receiveArtistInfoError
} from "../action";

function ArtistRoute() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const dispatch = useDispatch();

  const currentArtist = useSelector(state => state.artists.currentArtist);
  const topTracks = useSelector(state => state.artists.topTracks);
  // const artistStatus = useSelector(state => state.artists.status);
  const accessToken = useSelector(state => state.auth.token);
  // const accessStatus = useSelector(state => state.auth.status);
  const { id } = useParams();

  useEffect(() => {
    if (accessToken) {
      dispatch(requestAllArtistInfo());

      const ArtistProfile =
        fetchArtistInfo(accessToken, id)
          .then(data => dispatch(receiveArtistProfile(data)))
          .catch(error => dispatch(receiveArtistInfoError()));

      const ArtistTopTracks =
        fetchArtistInfo(accessToken, id, 'top-tracks?country=CA')
          .then(data => dispatch(receiveTopTracks(data.tracks)))
          .catch(error => dispatch(receiveArtistInfoError()));

      Promise.all([ArtistProfile, ArtistTopTracks]).then(() => dispatch(receiveAllArtistInfo()));
    }
  }, [accessToken]);


  if (currentArtist && topTracks) {
    const {
      name,
      images: [
        { url: primaryArtistImage }
      ],
      followers: {
        total
      },
      genres: [
        firstGenre,
        secondGenre
      ]
    } = currentArtist;

    const totalFollowers = largeNumberFormatter(total);

    const [track] = topTracks;

    return (
      <Wrapper>
        <Header>
          <ArtistImage
            src={primaryArtistImage}
            alt="Artist Image"
          />
          <ArtistName>{name}</ArtistName>
          <FollowersContainer>
            <Followers>{totalFollowers}</Followers>
            <span>followers</span>
          </FollowersContainer>
        </Header>
        <TagsSection>
          <TagsTitle>Tags</TagsTitle>
          <TagsContainer>
            {[firstGenre, secondGenre].map((genre, index) => {
              return (
                <Tag key={index}>
                  <Genre>{genre}</Genre>
                </Tag>
              )
            })}
          </TagsContainer>
        </TagsSection>
        <PlayButton
          url={track.preview_url}
          active={currentlyPlaying === track.name}
          play={() => {
            setCurrentlyPlaying(track.name);
          }}
          stop={() => {
            setCurrentlyPlaying(null);
          }}
          playIconColor="white"
          stopIconColor="white"
          idleBackgroundColor="rgba(75, 75, 75, 0.4)"
          progressCircleColor="#3354FF"
          progressCircleWidth={42}
        />
      </Wrapper>
    )
  } else {
    return <div>Loading...</div>
  }
}

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  margin: 0 auto;
`;

const Header = styled.div`
  position: absolute;
  width: 268px;
  height: 215px;
  left: 54px;
  top: 59px;
`;

const ArtistImage = styled.img`
  position: absolute;
  width: 175px;
  height: 175px;
  left: 104px;
  top: 59px;
  border-radius: 190.5px;
`;

const ArtistName = styled.h1`
  position: absolute;
  width: 298px;
  height: 59px;
  left: 54px;
  top: 173px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;

  color: white;

  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75),
               0px 4px 4px rgba(0, 0, 0, 0.5),
               4px 8px 25px #000000;
`;

const FollowersContainer = styled.div`
  position: absolute;
  width: 93px;
  height: 17px;
  left: 145px;
  top: 257px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const Followers = styled.span`
  color: #FF4FD8;
  padding-right: 15px;
`;

const TagsSection = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 250px;
  height: 79px;
  left: 110px;
  top: 478px;
`;

const TagsTitle = styled.h2`
  width: 48px;
  height: 26px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;

  color: white;
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  align-items: center;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 29px;
  background: rgba(75, 75, 75, 0.4);
  border-radius: 4px;
  padding: 20px;
`;

const Genre = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;

  color: white;
`;

export default ArtistRoute;
