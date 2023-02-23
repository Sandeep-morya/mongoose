import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Note from '../Components/Note';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  async function getNotes() {
    try {
      const { data } = await axios.get("http://localhost:8080/api/notes", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      setNotes(data.notes)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getNotes()
  }, [])
  console.log(notes);
  return (
    <div>
      All Notes
      <br />
      <div>
        {notes.map(({ _id, title, body }, index) => (
          <Note key={_id} {...{ index, title, body }} />
        ))}
      </div>
    </div>
  )
}

export default Notes