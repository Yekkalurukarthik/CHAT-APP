// import { useNavigate } from "react-router-dom";

// const CustomMessage = (props) => {
//   const { message } = props; // <- make sure this exists
//   const navigate = useNavigate();

//   if (!message) return null; // prevent crashes

//   if (message.customType === "video_call") {
//     return (
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={() => navigate(`/call/${message.callId}`)}
//       >
//         Join Video Call
//       </button>
//     );
//   }

//   return <div>{message.text}</div>;
// };

// export default CustomMessage;