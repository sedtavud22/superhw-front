import axios from "axios";

const HomeworkCard = ({ homework, openEditModal, setReload }) => {
  const { id, question, startdate, duedate, isPublished, subject } = homework;

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-UK", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  };

  const handleDelete = async (e) => {
    try {
      e.stopPropagation();
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8888/homework/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReload((prv) => !prv);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="card w-5/6 bg-base-100 shadow-xl mx-auto"
      onClick={() => openEditModal(homework)}
    >
      <div className="card-body gap-4">
        <div className="flex justify-between">
          <div className="text-xl">
            {subject.title}
            <small
              className={`border ${
                isPublished && "border-accent"
              } rounded ms-2 p-0.5 text-xs`}
            >
              {!isPublished && "Un-"}
              Published
            </small>
          </div>
          <div
            className="badge badge-error badge-outline cursor-pointer"
            onClick={handleDelete}
          >
            delete
          </div>
        </div>
        <div className="flex justify-between">
          <p>Start : {formatDate(new Date(startdate))}</p>
          <p className="text-right">Due : {formatDate(new Date(duedate))}</p>
        </div>
        <p className="text-lg">{question}</p>
      </div>
    </div>
  );
};

export default HomeworkCard;
