import React from "react";
import useInput from "../hooks/useInput";
import Button from "../Button";

const EditForm = ({ music, onEditMusic, onCancelEdit }) => {
  const artistInput = useInput(music.artist);
  const titleInput = useInput(music.title);
  const youtubeUrlInput = useInput(music.youtubeUrl);

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

    onEditMusic({
      id: music.id,
      artist: artistInput.value,
      title: titleInput.value,
      youtubeUrl: youtubeUrlInput.value,
    });

    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Artist" {...artistInput} />
      <input type="text" placeholder="Title" {...titleInput} />
      <input type="text" placeholder="YouTube URL" {...youtubeUrlInput} />
      <Button type="submit">Update Music</Button>
      <Button type="button" onClick={onCancelEdit}>
        Cancel
      </Button>
    </form>
  );
};

export default EditForm;
