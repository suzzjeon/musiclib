import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../axios/api";
import Button from "../components/Button";
import SubmitForm from "../components/form/SubmitForm";
import EditForm from "../components/form/EditForm";
import { Link } from "react-router-dom";
// import YouTubePlayer from "../components/detail/YouTubePlayer";

const Home = () => {
  const [musicList, setMusicList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editMusic, setEditMusic] = useState(null);

  useEffect(() => {
    fetchMusicList();
  }, []);

  const fetchMusicList = async () => {
    try {
      const response = await api.get("/musics");
      const reversedMusicList = response.data.reverse();
      setMusicList(reversedMusicList);
    } catch (error) {
      console.error("Error fetching music list:", error);
    }
  };

  const handleAddMusic = async (newMusic) => {
    try {
      await api.post("/musics", newMusic);
      console.log("Music added:", newMusic);
      fetchMusicList();
    } catch (error) {
      console.error("Error adding music:", error);
    }
  };

  const handleEditMusic = async (updatedMusic) => {
    try {
      await api.put(`/musics/${updatedMusic.id}`, updatedMusic);
      console.log("Music updated:", updatedMusic);
      fetchMusicList();
    } catch (error) {
      console.error("Error updating music:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditMusic(null);
  };

  const redirectToYoutube = (url) => {
    window.open(url, "_blank");
  };

  const handleDelete = async (musicId) => {
    try {
      await api.delete(`/musics/${musicId}`);
      console.log("Music deleted:", musicId);
      fetchMusicList();
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  };

  return (
    <Layout>
      <StContainer>
        <StMain>
          <h1>{editMode ? "edit" : "add"}</h1>
          {editMode ? (
            <EditForm
              music={editMusic}
              onEditMusic={handleEditMusic}
              onCancelEdit={handleCancelEdit}
            />
          ) : (
            <SubmitForm onAddMusic={handleAddMusic} />
          )}

          <h2>your playlist</h2>
          <MusicCardContainer>
            {musicList.map((music) => (
              <MusicCard key={music.id}>
                <Link to={`/detail/${music.id}`}>
                  {music.artist} - {music.title}
                </Link>
                {/* <YouTubePlayer youtubeUrl={music.youtubeUrl} /> */}
                <ButtonContainer>
                  <Button onClick={() => redirectToYoutube(music.youtubeUrl)}>
                    listen
                  </Button>
                  <Button
                    onClick={() => {
                      setEditMode(true);
                      setEditMusic(music);
                    }}
                  >
                    edit
                  </Button>
                  <Button onClick={() => handleDelete(music.id)}>delete</Button>
                </ButtonContainer>
              </MusicCard>
            ))}
          </MusicCardContainer>
        </StMain>
      </StContainer>
    </Layout>
  );
};

export default Home;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StMain = styled.div`
  margin-top: 24px;
  gap: 24px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const MusicCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, auto));
  grid-template-rows: repeat(auto-fill);
  grid-gap: 15px;
  min-width: 600px;
`;

const MusicCard = styled.div`
  background-color: transparent;
  border: 1px solid gray;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  width: 150px;

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
`;
