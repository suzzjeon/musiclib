import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../axios/api";
import Layout from "../components/Layout";
import YouTubePlayer from "../components/detail/YouTubePlayer";

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
    <Layout>
      <Container>
        <MusicInfo>
          <div>
            <h2>artist</h2>
            <p>{music.artist}</p>
          </div>
          <div>
            <h2>title</h2>
            <p>{music.title}</p>
          </div>
          <YouTubePlayerBox>
            <YouTubePlayer youtubeUrl={music.youtubeUrl} />
          </YouTubePlayerBox>
        </MusicInfo>
      </Container>
    </Layout>
  );
};

export default Detail;

const Container = styled.div`
  margin: 0 auto;
`;

const MusicInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 24px;
`;

const YouTubePlayerBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;
