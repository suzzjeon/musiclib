# [music library](https://musiclib.vercel.app/)

## API 명세

| Feature   | End Point   | Method | Request Body                                                                  | Response Body                                                                              |
| --------- | ----------- | ------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 목록 조회 | /music      | GET    |                                                                               | {"id": 고유 ID, "artist": 아티스트 이름, "title": 음악 제", "youtubeUrl": 유튜브 링크 URL} |
| 음악 추가 | /music      | POST   | {"artist": 아티스트 이름, "title": 음악 제목, "youtubeUrl": 유튜브 링크 URL"} |                                                                                            |
| 음악 수정 | /music/{id} | PATCH  | {"artist": 아티스트 이름, "title": 음악 제목, "youtubeUrl": 유튜브 링크 URL"} |                                                                                            |
| 음악 삭제 | /music/{id} | DELETE |                                                                               |                                                                                            |
