import React from "react";
import useInput from "../hooks/useInput";
import Button from "../Button";

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
      <input type="text" placeholder="Artist" {...artistInput} />
      <input type="text" placeholder="Title" {...titleInput} />
      <input type="text" placeholder="YouTube URL" {...youtubeUrlInput} />
      <Button type="submit">add music</Button>
    </form>
  );
};

export default SubmitForm;
