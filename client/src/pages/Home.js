import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contributor, setContributor] = useState("");

  useEffect(() => {
    if(location && location.state !== null){
      setTitle(location.state.title)
      setContributor(location.state.contributor)
      setDescription(location.state.description)
    }
  }, [])

  const postDetails = () => {
    fetch("/createNote", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        contributor,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Notes created successfully !");
          navigate("/notes");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editNote = (noteId) => {
    fetch("/updateNote", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        noteId,
        description,
        contributor,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Note updated successfully !");
          navigate("/notes");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div class="w-full h-full flex flex-col">
        <div class="h-[10vh]">
          <Navbar id={((location && location.state !== null) ? "edit" : "create")} />
        </div>

        <div class="w-full h-[90vh]">
          <div class="w-full h-full overflow-hidden bg-gradient-to-r from-emerald-400 to-cyan-400 flex justify-center items-center flex-col p-4">
            <div class="bg-white w-2/6 h-4/6 p-8 flex justify-center items-center flex-col rounded">
              <h1 class="font-serif text-2xl p-2 pt-0">Create Notes</h1>
              <form
                id="additionForm"
                action="#"
                class="w-full h-full font-serif flex justify-center items-center flex-col"
              >
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  class="border-2 border-gray-300 p-2 m-2 w-5/6"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  placeholder="Enter description"
                  class="border-2 border-gray-300 p-2 m-2 w-5/6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input
                  type="text"
                  name="contributor"
                  id="contributor"
                  placeholder="Contributor"
                  class="border-2 border-gray-300 p-2 m-2 w-5/6"
                  value={contributor}
                  onChange={(e) => setContributor(e.target.value)}
                />
                {(location && location.state !== null) ? (
                  <a
                    id="submitButton"
                    class="border-2 border-gray-300 p-2 m-2 bg-gradient-to-r from-teal-400 to-yellow-200 cursor-pointer"
                    onClick={() => editNote(location.state._id)}
                  >
                    Edit
                  </a>
                ) : (
                  <a
                    id="submitButton"
                    class="border-2 border-gray-300 p-2 m-2 bg-gradient-to-r from-teal-400 to-yellow-200 cursor-pointer"
                    onClick={() => postDetails()}
                  >
                    Submit
                  </a>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
