import React from 'react'
import {accountStore} from '../zustandStore'
import Link from 'next/link'

type props = {
  vis: boolean,
  setVis: React.Dispatch<React.SetStateAction<boolean>>,
  id: number,
  setId: React.Dispatch<React.SetStateAction<number>>
}

export default function EditModal({vis, setVis, id, setId}: props) {

  const [message, setMessage] = React.useState<string>("");
  const {name} = accountStore();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    let url = `//${window.location.host}/api/notes/${id}`
    
    const res = await fetch(url, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        owner: name
      }),
    });
    
  if (res.ok) {
      window.location.reload()
      }
  }
  
  return (
    <>
        <div className="w-screen h-screen backdrop-blur flex flex-col items-center justify-center">
      <div className="h-2/5 min-h-[20rem] bg-red-300 w-3/5 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-10">
          <label htmlFor="newMessage" className="flex flex-row justify-center items-center gap-10">
            <span> Edit message: </span>
            <input className="px-5 py-2" type="text" name="newMessage" required value={message} onChange={(e) => setMessage((e.target as HTMLInputElement).value)}></input>
          </label>
            <div className="flex flex-col gap-4 justify-center items-center">
          <button type="submit" className="bg-stone-200 hover:bg-stone-100 transition-all px-5 py-2 rounded-xl">Submit</button>
            <button className="bg-stone-200 hover:bg-stone-100 transition-all px-5 py-2 rounded-xl" onClick={() => setVis(false)}>Back</button>
                    </div>
      </form>
        </div>
    </div>
  </>
  )
}