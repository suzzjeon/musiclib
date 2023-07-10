import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../axios/api";

const Home = () => {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [musicList, setMusicList] = useState([]);

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
      const response = await api.post("/musics", {
        artist,
        title,
        youtubeUrl,
      });
      console.log("Music added:", response.data);
      setArtist("");
      setTitle("");
      setYoutubeUrl("");
      fetchMusicList();
    } catch (error) {
      console.error("Error adding music:", error);
    }
  };

  const redirectToYoutube = (url) => {
    window.open(url, "_blank");
  };

  const handleDelete = async (musicId) => {
    try {
      await api.delete(`/musics/${musicId}`);
      console.log("Music deleted:", musicId);
      fetchMusicList(); // 음악 삭제 후 리스트 다시 가져오기
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  };

  return (
    <Layout>
      <StContainer>
        <StMain>
          <h1>Add Music</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="YouTube URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
            <button type="submit">Add Music</button>
          </form>

          <h2>Music List</h2>
          {musicList.map((music) => (
            <MusicCard key={music.id}>
              {music.artist} - {music.title}{" "}
              <button onClick={() => redirectToYoutube(music.youtubeUrl)}>
                들으러 가기
              </button>
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
