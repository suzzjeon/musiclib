import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../axios/api";
import Button from "../components/Button";
import SubmitForm from "../components/home/SubmitForm";
import EditForm from "../components/home/EditForm";
import { Link } from "react-router-dom"; // react-router-dom에서 Link를 가져옵니다.

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
          <h1>{editMode ? "Edit Music" : "Add Music"}</h1>
          {editMode ? (
            <EditForm
              music={editMusic}
              onEditMusic={handleEditMusic}
              onCancelEdit={handleCancelEdit}
            />
          ) : (
            <SubmitForm onAddMusic={handleAddMusic} />
          )}

          <h2>Music List</h2>
          {musicList.map((music) => (
            <MusicCard key={music.id}>
              <Link to={`/detail/${music.id}`}>
                {music.artist} - {music.title}
              </Link>
              <Button onClick={() => redirectToYoutube(music.youtubeUrl)}>
                들으러 가기
              </Button>
              <Button
                onClick={() => {
                  setEditMode(true);
                  setEditMusic(music);
                }}
              >
                수정
              </Button>
              <Button onClick={() => handleDelete(music.id)}>삭제</Button>
            </MusicCard>
          ))}
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

const MusicCard = styled.div`
  background-color: #f0f0f0;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
`;
