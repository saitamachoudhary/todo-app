import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo} from "../Store/todoSlice";

const AddTodoModal = ({ isOpen, onClose }) => {
  const[validateTitle,setvalidateTitle]=useState(false);
  const[validateMessage,setvalidateMessage]=useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Todos");
  const dispatch = useDispatch();
  const Typelist = useSelector((state) =>
    state.todos.items.map((ele) => ele.Type)
  );
  
  const handleSave = () => {
      if(title.length===0||message.length===0){
        setvalidateTitle(true);
        setvalidateMessage(true);
        return;
      }
      dispatch(addTodo({ title, message, type }));
      setTitle("");
      setMessage("");
      setType("Todos");
      onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Add Todo</h2>
        <div className="mb-2">
          <label className="block">Title:</label>
          <input
            className="border rounded w-full px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className={`text-red-400 ${validateTitle ? `flex` : `hidden`}`}>
            Required
          </p>
        </div>
        <div className="mb-2">
          <label className="block">Message:</label>
          <textarea
            className="border rounded w-full px-2 py-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <p className={`text-red-400 ${validateMessage ? `flex` : `hidden`}`}>
            Required
          </p>
        </div>
        <div className="mb-2">
          <label className="block">Type:</label>
          <select
            className="border rounded w-full px-2 py-1"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {Typelist.map((ele, index) => (
              <option key={index} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
