import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../axios/api";

const Detail = () => {
  const { id } = useParams();
  const [music, setMusic] = useState(null);

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      const response = await api.get(`/musics/${id}`);
      setMusic(response.data);
    } catch (error) {
      console.error("Error fetching music:", error);
    }
  };

  if (!music) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <Container>
      <h1>Music Detail</h1>
      <MusicInfo>
        <div>
          <h2>Artist</h2>
          <p>{music.artist}</p>
        </div>
        <div>
          <h2>Title</h2>
          <p>{music.title}</p>
        </div>
        <div>
          <h2>YouTube URL</h2>
          <p>{music.youtubeUrl}</p>
        </div>
      </MusicInfo>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  padding: 24px;
`;

const MusicInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 24px;
`;