import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

const ViewNotes = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const deleteNote = (noteId) => {
    if(window.confirm("Are you sure to delete this note ??")){
      fetch(`/deleteNote/${noteId}`, {
          method : "delete",
          headers:{
            "Content-Type": "application/json",
          }
      })
      .then(res => res.json())
      .then(result =>{
          const newData = notes.filter(item =>{
              return item._id !== result._id
          })
          setNotes(newData)
      })
  } 
  }

  const editNote = (data) => {
      navigate('/', {state: data})
  }

  useEffect(() => {
    fetch("/allNotes", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setNotes(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [notes]);

  return (
    <>
      <div class="w-full h-full flex flex-col">
        <div class="h-[10vh]">
          <Navbar id={'create'}/>
        </div>

        <div class="w-full h-[90vh]">
          <div class="w-full h-full overflow-hidden bg-gradient-to-r from-emerald-400 to-cyan-400 flex justify-center items-center flex-col p-4">
            <div class="w-full h-full bg-white p-4 flex flex-row flex-wrap overflow-y-auto rounded">
              {notes &&
                notes.map((data) => {
                  return (
                    <div id={data ? data._id : ''} className="flex justify-center  m-2">
                      <div class="relative flex w-full max-w-[26rem] min-w-[15rem] flex-col rounded-xl bg-slate-50 bg-clip-border text-gray-700 shadow-lg">
                        <div class="p-6">
                          <div class="flex items-center justify-between">
                            <h5 class="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                              {data ? data.title : ""}
                            </h5>
                          </div>
                          <div className="flex items-center justify-end mb-3">
                            <p class="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                              {data ? data.contributor : ""}
                            </p>
                          </div>
                          <p class="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                            {data ? data.description : ""}
                          </p>
                          <div class="flex justify-center items-center gap-3 mt-8 group">
                            <span class="material-symbols-outlined cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-2 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                              <span
                                class="material-symbols-outlined"
                                onClick={() => deleteNote(data ? data._id : '')}
                              >
                                delete
                              </span>
                            </span>
                            <span class="material-symbols-outlined cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-2 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                              <span
                                class="material-symbols-outlined"
                                onClick={() => editNote(data ? data : '')}
                              >
                                edit
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewNotes;
