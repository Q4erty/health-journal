import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useParams } from 'react-router-dom';

const EntryDetailPage = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`/entries/${id}`);
      setEntry(res.data);
      const c = await api.get(`/comments?entryId=${id}`);
      setComments(c.data);
    };
    fetch();
  }, [id]);

  const addComment = async () => {
    if (!comment) return;
    const newComment = {
      entryId: id,
      text: comment,
      date: new Date().toISOString(),
    };
    const res = await api.post('/comments', newComment);
    setComments((prev) => [...prev, res.data]);
    setComment('');
  };

  if (!entry) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>{entry.date}</h2>
      <p><strong>Настроение:</strong> {entry.mood}</p>
      <p><strong>Пульс:</strong> {entry.pulse}</p>
      <p><strong>Комментарий:</strong> {entry.comment}</p>

      <h3>Комментарии</h3>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            {c.text} <small>{new Date(c.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>

      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <br />
      <button onClick={addComment}>Добавить комментарий</button>
    </div>
  );
};

export default EntryDetailPage;
