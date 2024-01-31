import axios from "axios";
import { useState, useEffect } from "react";
import HomeworkCard from "./HomeworkCard";
import ModalEditForm from "./ModalEditForm";

const TeacherHome = () => {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8888/homework", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHomework(res.data.homeworks);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

  const openEditModal = (data) => {
    document.getElementById("edit_modal").showModal();
    setEditData(data);
  };
  const closeEditModal = (data) => {
    document.getElementById("edit_modal").close();
    setEditData(data);
  };

  if (loading) {
    return <div className="text-4xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl text-center">All Homeworks</h1>
      {homework.map((el) => (
        <HomeworkCard
          key={el.id}
          homework={el}
          openEditModal={openEditModal}
          setReload={setReload}
        />
      ))}
      <>
        <dialog id="edit_modal" className="modal">
          <div className="modal-box">
            {editData?.id && (
              <ModalEditForm
                editData={editData}
                closeEdit={closeEditModal}
                setReload={setReload}
              />
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    </div>
  );
};

export default TeacherHome;
