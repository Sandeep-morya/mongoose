import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Note from '../Components/Note';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  async function getNotes() {
    try {
      const { data } = await axios.get("https://wild-red-spider-shoe.cyclic.app/api/notes", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      setNotes(data.notes)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate(id, noteData) {
    try {
      await axios.patch(`https://wild-red-spider-shoe.cyclic.app/api/notes/${id}`, noteData, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }
  async function handleDelete(id) {
    try {
      await axios.delete(`https://wild-red-spider-shoe.cyclic.app/api/notes/${id}`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    getNotes()
  }, [])
  return (
    <div>
      Total Notes = {notes.length}
      <br />
      <div className='notes'>
        {notes.map(({ _id, title, body }, index) => (
          <Note key={_id} {...{ id: _id, index, title, body, handleUpdate, handleDelete }} />
        ))}
      </div>
    </div>
  )
}

export default Notes