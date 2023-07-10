import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../axios/api";
import useInput from "../hooks/useInput";

const Home = () => {
  const artistInput = useInput("");
  const titleInput = useInput("");
  const youtubeUrlInput = useInput("");
  const [musicList, setMusicList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editMusicId, setEditMusicId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/musics/${editMusicId}`, {
          artist: artistInput.value,
          title: titleInput.value,
          youtubeUrl: youtubeUrlInput.value,
        });
        console.log("Music updated:", editMusicId);
        setEditMode(false);
        setEditMusicId(null);
      } else {
        const response = await api.post("/musics", {
          artist: artistInput.value,
          title: titleInput.value,
          youtubeUrl: youtubeUrlInput.value,
        });
        console.log("Music added:", response.data);
      }
      artistInput.reset();
      titleInput.reset();
      youtubeUrlInput.reset();
      fetchMusicList();
    } catch (error) {
      console.error("Error adding music:", error);
    }
  };

  const handleEdit = (music) => {
    artistInput.setValue(music.artist);
    titleInput.setValue(music.title);
    youtubeUrlInput.setValue(music.youtubeUrl);
    setEditMode(true);
    setEditMusicId(music.id);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditMusicId(null);
    artistInput.reset();
    titleInput.reset();
    youtubeUrlInput.reset();
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
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Artist" {...artistInput} />
            <input type="text" placeholder="Title" {...titleInput} />
            <input type="text" placeholder="YouTube URL" {...youtubeUrlInput} />
            <button type="submit">
              {editMode ? "Update Music" : "Add Music"}
            </button>
            {editMode && (
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </form>

          <h2>Music List</h2>
          {musicList.map((music) => (
            <MusicCard key={music.id}>
              {music.artist} - {music.title}{" "}
              <button onClick={() => redirectToYoutube(music.youtubeUrl)}>
                들으러 가기
              </button>
              <button onClick={() => handleEdit(music)}>수정</button>
              <button onClick={() => handleDelete(music.id)}>삭제</button>
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
`;
