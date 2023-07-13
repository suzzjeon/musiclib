import React from "react";
import useInput from "../hooks/useInput";
import Button from "../Button";
import styled from "styled-components";

const SubmitForm = ({ onAddMusic }) => {
  const artistInput = useInput("");
  const titleInput = useInput("");
  const youtubeUrlInput = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!artistInput.value || !titleInput.value || !youtubeUrlInput.value) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    // const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]{11}$/;
    // if (!youtubeUrlPattern.test(youtubeUrlInput.value)) {
    //   alert("유효한 YouTube URL을 입력해주세요.");
    //   return;
    // }

    onAddMusic({
      artist: artistInput.value,
      title: titleInput.value,
      youtubeUrl: youtubeUrlInput.value,
    });

    artistInput.reset();
    titleInput.reset();
    youtubeUrlInput.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <InputSong>
          <input type="text" placeholder="Artist" {...artistInput} />
          <input type="text" placeholder="Title" {...titleInput} />
          <input type="text" placeholder="YouTube URL" {...youtubeUrlInput} />
          <Button type="submit">add music</Button>
        </InputSong>
      </FormContainer>
    </form>
  );
};

const FormContainer = styled.div`
  min-width: 600px;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const InputSong = styled.div`
  margin-bottom: 10px;
  gap: 10px;

  input {
    border: 1px solid gray;
    border-radius: 4px;
    margin-right: 10px;
  }
`;

export default SubmitForm;
